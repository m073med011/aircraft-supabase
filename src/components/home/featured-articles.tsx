interface Article {
  title: string;
  category: string;
  image: string;
  link: string;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">
        Featured Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 pb-3 group cursor-pointer"
          >
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url("${article.image}")` }}
              />
            </div>
            <div className="px-1">
              <p className="text-white text-base font-medium leading-normal">
                {article.title}
              </p>
              <p className="text-def-gray-mid text-sm font-normal leading-normal">
                {article.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

