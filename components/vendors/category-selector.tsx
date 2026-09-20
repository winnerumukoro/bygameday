"use client";

import { cn } from "@/lib/utils";
import { UtensilsCrossed, ShoppingBag, Camera, Check } from "lucide-react";
import type { VendorCategory, VendorSubcategory } from "@/lib/vendors/data";

/* ──────────────────── Category Icons ──────────────────── */

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  food: UtensilsCrossed,
  merch: ShoppingBag,
  services: Camera,
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  food: "Food trucks, pop-up kitchens, dessert stands, beverage vendors",
  merch: "Streetwear brands, sporting goods, athletic accessories",
  services: "Photography, barber services, face painting, fan experiences",
};

/* ──────────────────── Category Selector ──────────────────── */

interface CategorySelectorProps {
  categories: VendorCategory[];
  subcategories: VendorSubcategory[];
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
}

export function CategorySelector({
  categories,
  subcategories,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryChange,
  onSubcategoryChange,
}: CategorySelectorProps) {
  const filteredSubcategories = subcategories.filter(
    (s) => s.categoryId === selectedCategoryId
  );

  return (
    <div className="space-y-6">
      {/* Category Cards */}
      <div>
        <label className="block text-sm font-headline uppercase tracking-wider text-ink/70 mb-3">
          Select Your Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] ?? ShoppingBag;
            const isSelected = selectedCategoryId === cat.id;
            const desc = CATEGORY_DESCRIPTIONS[cat.slug] ?? "";

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onCategoryChange(cat.id);
                  onSubcategoryChange(""); // Reset subcategory on category change
                }}
                className={cn(
                  "relative flex flex-col items-start p-4 border-2 text-left transition-all",
                  isSelected
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/15 bg-white text-ink hover:border-ink/40"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-gold flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <Icon className={cn("w-6 h-6 mb-2", isSelected ? "text-gold" : "text-ink/50")} />
                <span className="font-headline text-sm uppercase tracking-wider">
                  {cat.name}
                </span>
                <span
                  className={cn(
                    "text-xs mt-1 leading-relaxed",
                    isSelected ? "text-ivory/70" : "text-ink/50"
                  )}
                >
                  {desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategory Selection */}
      {selectedCategoryId && filteredSubcategories.length > 0 && (
        <div>
          <label className="block text-sm font-headline uppercase tracking-wider text-ink/70 mb-3">
            Select Your Specialty
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredSubcategories.map((sub) => {
              const isSelected = selectedSubcategoryId === sub.id;

              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => onSubcategoryChange(sub.id)}
                  className={cn(
                    "flex items-center justify-between p-3 border-2 text-left text-sm transition-all",
                    isSelected
                      ? "border-gold bg-gold/5 text-ink"
                      : "border-ink/10 bg-white text-ink/70 hover:border-ink/30 hover:text-ink"
                  )}
                >
                  <span className="font-body font-medium">{sub.name}</span>
                  {isSelected && (
                    <div className="w-5 h-5 bg-gold flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
