"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ReactionButtonsProps {
  entityType: "country" | "weapon" | "army" | "relation";
  entityId: string;
  initialCounts?: {
    like_count: number;
    dislike_count: number;
    love_count: number;
  };
}

export function ReactionButtons({
  entityType,
  entityId,
  initialCounts = { like_count: 0, dislike_count: 0, love_count: 0 },
}: ReactionButtonsProps) {
  const [counts, setCounts] = useState(initialCounts);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        loadUserReactions(user.id);
      }
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserReactions(session.user.id);
      } else {
        setUserReactions([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [entityId]);

  const loadUserReactions = async (userId: string) => {
    const { data } = await supabase
      .from("reactions")
      .select("reaction_type")
      .eq("entity_type", entityType)
      .eq("entity_id", entityId)
      .eq("user_id", userId);

    if (data) {
      setUserReactions(data.map((r) => r.reaction_type));
    }
  };

  const handleReaction = async (reactionType: "like" | "dislike" | "love") => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to react to items.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const hasReaction = userReactions.includes(reactionType);

      if (hasReaction) {
        // Remove reaction
        await fetch("/api/reactions", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entityType,
            entityId,
            reactionType,
          }),
        });

        setUserReactions(userReactions.filter((r) => r !== reactionType));
        setCounts({
          ...counts,
          [`${reactionType}_count`]: Math.max(0, counts[`${reactionType}_count` as keyof typeof counts] - 1),
        });
      } else {
        // Add reaction
        await fetch("/api/reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entityType,
            entityId,
            reactionType,
          }),
        });

        setUserReactions([...userReactions, reactionType]);
        setCounts({
          ...counts,
          [`${reactionType}_count`]: counts[`${reactionType}_count` as keyof typeof counts] + 1,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update reaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "gap-2",
          userReactions.includes("like") && "bg-green-100 border-green-300 dark:bg-green-900/30"
        )}
        onClick={() => handleReaction("like")}
        disabled={loading}
      >
        <ThumbsUp className="h-4 w-4" />
        {counts.like_count}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={cn(
          "gap-2",
          userReactions.includes("dislike") && "bg-red-100 border-red-300 dark:bg-red-900/30"
        )}
        onClick={() => handleReaction("dislike")}
        disabled={loading}
      >
        <ThumbsDown className="h-4 w-4" />
        {counts.dislike_count}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={cn(
          "gap-2",
          userReactions.includes("love") && "bg-pink-100 border-pink-300 dark:bg-pink-900/30"
        )}
        onClick={() => handleReaction("love")}
        disabled={loading}
      >
        <Heart className="h-4 w-4" />
        {counts.love_count}
      </Button>
    </div>
  );
}

