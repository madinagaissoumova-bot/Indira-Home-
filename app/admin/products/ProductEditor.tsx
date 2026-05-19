"use client";

import Link from "next/link";
import { useActionState } from "react";
import { PRODUCT_STATUS } from "@/lib/constants";
import type { AdminActionState } from "../actions";
import { deleteProductAction, saveProductAction } from "../actions";

type CategoryOption = {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
    categoryId: string;
  }[];
};

type ProductEditorProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceRub: number;
  stockQuantity: number;
  status: string;
  isNew: boolean;
  brand: string | null;
  characteristics: string | null;
  displayOrder: number;
  categoryId: string;
  subcategoryId: string;
  images: { url: string; alt: string }[];
};

type ProductEditorProps = {
  categories: CategoryOption[];
  product?: ProductEditorProduct | null;
};

function emptyState(): AdminActionState {
  return {};
}

export function ProductEditor({ categories, product }: ProductEditorProps) {
  const [saveState, saveAction, isSaving] = useActionState(saveProductAction, emptyState());
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteProductAction, emptyState());
  const currentImage = product?.images[0];
  const currentCategory = categories.find((category) => category.id === product?.categoryId);

  return (
    <div className="checkout-layout">
      <form action={saveAction} className="form-panel">
        <h2>{product ? "Modifier le produit" : "Créer un produit"}</h2>
        {saveState.error ? <p className="form-error">{saveState.error}</p> : null}
        {saveState.success ? <p>{saveState.success}</p> : null}
        {product ? <input name="productId" type="hidden" value={product.id} /> : null}

        <div className="field">
          <label htmlFor={`name-${product?.id ?? "new"}`}>Nom</label>
          <input
            className="input"
            defaultValue={product?.name ?? ""}
            id={`name-${product?.id ?? "new"}`}
            name="name"
            required
          />
        </div>

        <div className="field">
          <label htmlFor={`slug-${product?.id ?? "new"}`}>Slug</label>
          <input
            className="input"
            defaultValue={product?.slug ?? ""}
            id={`slug-${product?.id ?? "new"}`}
            name="slug"
            required
          />
        </div>

        <div className="field">
          <label htmlFor={`description-${product?.id ?? "new"}`}>Description</label>
          <textarea
            className="input textarea"
            defaultValue={product?.description ?? ""}
            id={`description-${product?.id ?? "new"}`}
            name="description"
            required
          />
        </div>

        <div className="field">
          <label htmlFor={`brand-${product?.id ?? "new"}`}>Marque</label>
          <input
            className="input"
            defaultValue={product?.brand ?? ""}
            id={`brand-${product?.id ?? "new"}`}
            name="brand"
          />
        </div>

        <div className="field">
          <label htmlFor={`characteristics-${product?.id ?? "new"}`}>Caracteristiques</label>
          <textarea
            className="input textarea"
            defaultValue={product?.characteristics ?? ""}
            id={`characteristics-${product?.id ?? "new"}`}
            name="characteristics"
            placeholder={"Une ligne par caracteristique"}
          />
        </div>

        <div className="field">
          <label htmlFor={`priceRub-${product?.id ?? "new"}`}>Prix en roubles</label>
          <input
            className="input"
            defaultValue={product?.priceRub ?? 0}
            id={`priceRub-${product?.id ?? "new"}`}
            name="priceRub"
            min={1}
            required
            type="number"
          />
        </div>

        <div className="field">
          <label htmlFor={`stockQuantity-${product?.id ?? "new"}`}>Stock</label>
          <input
            className="input"
            defaultValue={product?.stockQuantity ?? 0}
            id={`stockQuantity-${product?.id ?? "new"}`}
            name="stockQuantity"
            min={0}
            required
            type="number"
          />
        </div>

        <div className="field">
          <label htmlFor={`displayOrder-${product?.id ?? "new"}`}>Ordre</label>
          <input
            className="input"
            defaultValue={product?.displayOrder ?? 0}
            id={`displayOrder-${product?.id ?? "new"}`}
            name="displayOrder"
            min={0}
            type="number"
          />
        </div>

        <div className="field">
          <label htmlFor={`status-${product?.id ?? "new"}`}>Statut</label>
          <select className="input" defaultValue={product?.status ?? PRODUCT_STATUS.draft} id={`status-${product?.id ?? "new"}`} name="status">
            <option value={PRODUCT_STATUS.draft}>Brouillon</option>
            <option value={PRODUCT_STATUS.published}>Publié</option>
            <option value={PRODUCT_STATUS.hidden}>Masqué</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor={`categoryId-${product?.id ?? "new"}`}>Catégorie</label>
          <select
            className="input"
            defaultValue={product?.categoryId ?? categories[0]?.id ?? ""}
            id={`categoryId-${product?.id ?? "new"}`}
            name="categoryId"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={`subcategoryId-${product?.id ?? "new"}`}>Sous-catégorie</label>
          <select
            className="input"
            defaultValue={
              product?.subcategoryId ??
              currentCategory?.subcategories[0]?.id ??
              categories[0]?.subcategories[0]?.id ??
              ""
            }
            id={`subcategoryId-${product?.id ?? "new"}`}
            name="subcategoryId"
            required
          >
            {categories.map((category) => (
              <optgroup key={category.id} label={category.name}>
                {category.subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={`imageUrl-${product?.id ?? "new"}`}>Image principale</label>
          <input
            className="input"
            defaultValue={currentImage?.url ?? ""}
            id={`imageUrl-${product?.id ?? "new"}`}
            name="imageUrl"
            placeholder="https://..."
            type="url"
          />
        </div>

        <div className="field">
          <label htmlFor={`imageAlt-${product?.id ?? "new"}`}>Texte alternatif</label>
          <input
            className="input"
            defaultValue={currentImage?.alt ?? product?.name ?? ""}
            id={`imageAlt-${product?.id ?? "new"}`}
            name="imageAlt"
          />
        </div>

        <label className="checkbox-row">
          <input defaultChecked={product?.isNew ?? false} name="isNew" type="checkbox" />
          <span>Nouvelle collection</span>
        </label>

        <div className="form-actions">
          <button className="button" disabled={isSaving} type="submit">
            {product ? "Enregistrer" : "Créer"}
          </button>
          {product ? (
            <Link className="button secondary" href="/admin/products">
              Retour
            </Link>
          ) : null}
        </div>
      </form>

      {product ? (
        <form action={deleteAction} className="form-panel">
          <h2>Suppression</h2>
          {deleteState.error ? <p className="form-error">{deleteState.error}</p> : null}
          {deleteState.success ? <p>{deleteState.success}</p> : null}
          <input name="productId" type="hidden" value={product.id} />
          <p>Ce produit ne peut être supprimé que s’il n’apparaît dans aucune commande validée.</p>
          <button className="button secondary" disabled={isDeleting} type="submit">
            Supprimer le produit
          </button>
        </form>
      ) : null}
    </div>
  );
}
