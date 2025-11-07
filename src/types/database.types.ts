export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      countries: {
        Row: {
          id: string;
          name: string;
          code: string;
          flag_url: string | null;
          description: string | null;
          population: number | null;
          gdp: number | null;
          military_budget: number | null;
          active_personnel: number | null;
          reserve_personnel: number | null;
          total_aircraft: number | null;
          total_tanks: number | null;
          total_naval_assets: number | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          flag_url?: string | null;
          description?: string | null;
          population?: number | null;
          gdp?: number | null;
          military_budget?: number | null;
          active_personnel?: number | null;
          reserve_personnel?: number | null;
          total_aircraft?: number | null;
          total_tanks?: number | null;
          total_naval_assets?: number | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          flag_url?: string | null;
          description?: string | null;
          population?: number | null;
          gdp?: number | null;
          military_budget?: number | null;
          active_personnel?: number | null;
          reserve_personnel?: number | null;
          total_aircraft?: number | null;
          total_tanks?: number | null;
          total_naval_assets?: number | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      weapons: {
        Row: {
          id: string;
          name: string;
          category: string;
          type: string | null;
          manufacturer: string | null;
          origin_country_id: string | null;
          description: string | null;
          specifications: Json | null;
          image_url: string | null;
          video_url: string | null;
          first_deployed: number | null;
          unit_cost: number | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          type?: string | null;
          manufacturer?: string | null;
          origin_country_id?: string | null;
          description?: string | null;
          specifications?: Json | null;
          image_url?: string | null;
          video_url?: string | null;
          first_deployed?: number | null;
          unit_cost?: number | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          type?: string | null;
          manufacturer?: string | null;
          origin_country_id?: string | null;
          description?: string | null;
          specifications?: Json | null;
          image_url?: string | null;
          video_url?: string | null;
          first_deployed?: number | null;
          unit_cost?: number | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      armies: {
        Row: {
          id: string;
          country_id: string;
          name: string;
          branch: string;
          description: string | null;
          personnel_count: number | null;
          headquarters: string | null;
          founded_year: number | null;
          logo_url: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          country_id: string;
          name: string;
          branch: string;
          description?: string | null;
          personnel_count?: number | null;
          headquarters?: string | null;
          founded_year?: number | null;
          logo_url?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          country_id?: string;
          name?: string;
          branch?: string;
          description?: string | null;
          personnel_count?: number | null;
          headquarters?: string | null;
          founded_year?: number | null;
          logo_url?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      country_weapon_relations: {
        Row: {
          id: string;
          country_id: string;
          weapon_id: string;
          relation_type: "ownership" | "usage" | "export" | "import";
          quantity: number | null;
          start_year: number | null;
          end_year: number | null;
          notes: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          country_id: string;
          weapon_id: string;
          relation_type: "ownership" | "usage" | "export" | "import";
          quantity?: number | null;
          start_year?: number | null;
          end_year?: number | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          country_id?: string;
          weapon_id?: string;
          relation_type?: "ownership" | "usage" | "export" | "import";
          quantity?: number | null;
          start_year?: number | null;
          end_year?: number | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reactions: {
        Row: {
          id: string;
          user_id: string;
          entity_type: string;
          entity_id: string;
          reaction_type: "like" | "dislike" | "love";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entity_type: string;
          entity_id: string;
          reaction_type: "like" | "dislike" | "love";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entity_type?: string;
          entity_id?: string;
          reaction_type?: "like" | "dislike" | "love";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: { user_id: string };
        Returns: boolean;
      };
      get_reaction_counts: {
        Args: { entity_type_param: string; entity_id_param: string };
        Returns: {
          like_count: number;
          dislike_count: number;
          love_count: number;
        }[];
      };
    };
    Enums: {
      user_role: "user" | "admin";
      reaction_type: "like" | "dislike" | "love";
      relation_type: "ownership" | "usage" | "export" | "import";
    };
  };
};

