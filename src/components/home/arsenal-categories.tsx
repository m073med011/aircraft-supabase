import Link from "next/link";

interface Category {
  icon: string;
  title: string;
  description: string;
  link: string | null;
}

interface ArsenalCategoriesProps {
  categories: Category[];
}

export function ArsenalCategories({ categories }: ArsenalCategoriesProps) {
  return (
    <div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">
        Explore the Arsenal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {categories.map((category, index) => {
          const content = (
            <div
              className={`flex flex-col items-center text-center p-6 bg-def-gray-dark rounded-xl border border-def-gray-mid/30 hover:bg-def-gray-mid/20 transition-colors ${
                category.link ? "cursor-pointer" : ""
              }`}
            >
              <span className="material-symbols-outlined text-4xl text-def-green mb-4">
                {category.icon}
              </span>
              <h3 className="text-white text-lg font-bold">{category.title}</h3>
              <p className="text-def-off-white text-sm mt-2">
                {category.description}
              </p>
            </div>
          );

          return category.link ? (
            <Link key={index} href={category.link}>
              {content}
            </Link>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}

