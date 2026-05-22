"use client";

import type { FormEvent } from "react";
import { useActionState } from "react";
import type { AdminActionState } from "../actions";
import {
  deleteCategoryAction,
  deleteSubcategoryAction,
  saveCategoryAction,
  saveSubcategoryAction
} from "../actions";
import type { AdminCategoryManagerItem } from "@/types";

type CategoryManagerProps = {
  categories: AdminCategoryManagerItem[];
};

function initialState(): AdminActionState {
  return {};
}

function confirmDelete(event: FormEvent<HTMLFormElement>) {
  if (!window.confirm("Confirmer la suppression definitive ?")) {
    event.preventDefault();
  }
}

function CategoryForm({ category }: { category?: AdminCategoryManagerItem }) {
  const [state, action, isPending] = useActionState(saveCategoryAction, initialState());

  return (
    <form action={action} className="form-panel">
      <h2>{category ? "Modifier la categorie" : "Créer une categorie"}</h2>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p>{state.success}</p> : null}
      {category ? <input name="categoryId" type="hidden" value={category.id} /> : null}
      <div className="field">
        <label htmlFor={`category-name-${category?.id ?? "new"}`}>Nom</label>
        <input
          className="input"
          defaultValue={category?.name ?? ""}
          id={`category-name-${category?.id ?? "new"}`}
          name="name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`category-slug-${category?.id ?? "new"}`}>Slug</label>
        <input
          className="input"
          defaultValue={category?.slug ?? ""}
          id={`category-slug-${category?.id ?? "new"}`}
          name="slug"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`category-status-${category?.id ?? "new"}`}>Visibilite</label>
        <select
          className="input"
          defaultValue={category?.status ?? "VISIBLE"}
          id={`category-status-${category?.id ?? "new"}`}
          name="status"
        >
          <option value="VISIBLE">Visible</option>
          <option value="HIDDEN">Masquee</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor={`category-order-${category?.id ?? "new"}`}>Ordre</label>
        <input
          className="input"
          defaultValue={category?.displayOrder ?? 0}
          id={`category-order-${category?.id ?? "new"}`}
          min={0}
          name="displayOrder"
          type="number"
        />
      </div>
      <button className="button" disabled={isPending} type="submit">
        {category ? "Enregistrer" : "Créer"}
      </button>
    </form>
  );
}

function SubcategoryForm({
  categoryId,
  subcategory
}: {
  categoryId: string;
  subcategory?: AdminCategoryManagerItem["subcategories"][number];
}) {
  const [state, action, isPending] = useActionState(saveSubcategoryAction, initialState());

  return (
    <form action={action} className="form-panel">
      <h3>{subcategory ? "Modifier la sous-categorie" : "Créer une sous-categorie"}</h3>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p>{state.success}</p> : null}
      <input name="categoryId" type="hidden" value={categoryId} />
      {subcategory ? <input name="subcategoryId" type="hidden" value={subcategory.id} /> : null}
      <div className="field">
        <label htmlFor={`subcategory-name-${subcategory?.id ?? categoryId}`}>Nom</label>
        <input
          className="input"
          defaultValue={subcategory?.name ?? ""}
          id={`subcategory-name-${subcategory?.id ?? categoryId}`}
          name="name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`subcategory-slug-${subcategory?.id ?? categoryId}`}>Slug</label>
        <input
          className="input"
          defaultValue={subcategory?.slug ?? ""}
          id={`subcategory-slug-${subcategory?.id ?? categoryId}`}
          name="slug"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`subcategory-status-${subcategory?.id ?? categoryId}`}>Visibilite</label>
        <select
          className="input"
          defaultValue={subcategory?.status ?? "VISIBLE"}
          id={`subcategory-status-${subcategory?.id ?? categoryId}`}
          name="status"
        >
          <option value="VISIBLE">Visible</option>
          <option value="HIDDEN">Masquee</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor={`subcategory-order-${subcategory?.id ?? categoryId}`}>Ordre</label>
        <input
          className="input"
          defaultValue={subcategory?.displayOrder ?? 0}
          id={`subcategory-order-${subcategory?.id ?? categoryId}`}
          min={0}
          name="displayOrder"
          type="number"
        />
      </div>
      <button className="button" disabled={isPending} type="submit">
        {subcategory ? "Enregistrer" : "Créer"}
      </button>
    </form>
  );
}

function SubcategoryCard({
  categoryId,
  subcategory
}: {
  categoryId: string;
  subcategory: AdminCategoryManagerItem["subcategories"][number];
}) {
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteSubcategoryAction, initialState());

  return (
    <div className="form-panel">
      <SubcategoryForm categoryId={categoryId} subcategory={subcategory} />
      <form action={deleteAction} onSubmit={confirmDelete}>
        {deleteState.error ? <p className="form-error">{deleteState.error}</p> : null}
        {deleteState.success ? <p>{deleteState.success}</p> : null}
        <input name="subcategoryId" type="hidden" value={subcategory.id} />
        <button className="button secondary" disabled={isDeleting} type="submit">
          Supprimer la sous-categorie
        </button>
      </form>
      <p>{subcategory.products.length} produit(s)</p>
    </div>
  );
}

function CategoryCard({ category }: { category: AdminCategoryManagerItem }) {
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteCategoryAction, initialState());

  return (
    <section className="admin-panel">
      <CategoryForm category={category} />
      <form action={deleteAction} className="form-panel" onSubmit={confirmDelete}>
        {deleteState.error ? <p className="form-error">{deleteState.error}</p> : null}
        {deleteState.success ? <p>{deleteState.success}</p> : null}
        <input name="categoryId" type="hidden" value={category.id} />
        <button className="button secondary" disabled={isDeleting} type="submit">
          Supprimer la categorie
        </button>
      </form>
      <div className="subcategory-strip">
        {category.subcategories.map((subcategory) => (
          <SubcategoryCard categoryId={category.id} key={subcategory.id} subcategory={subcategory} />
        ))}
      </div>
      <SubcategoryForm categoryId={category.id} />
    </section>
  );
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  const [state, action, isPending] = useActionState(saveCategoryAction, initialState());

  return (
    <div className="checkout-layout">
      <form action={action} className="form-panel">
        <h2>Créer une categorie</h2>
        {state.error ? <p className="form-error">{state.error}</p> : null}
        {state.success ? <p>{state.success}</p> : null}
        <div className="field">
          <label htmlFor="new-category-name">Nom</label>
          <input className="input" id="new-category-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="new-category-slug">Slug</label>
          <input className="input" id="new-category-slug" name="slug" required />
        </div>
        <div className="field">
          <label htmlFor="new-category-status">Visibilite</label>
          <select className="input" defaultValue="VISIBLE" id="new-category-status" name="status">
            <option value="VISIBLE">Visible</option>
            <option value="HIDDEN">Masquee</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="new-category-order">Ordre</label>
          <input className="input" defaultValue={0} id="new-category-order" min={0} name="displayOrder" type="number" />
        </div>
        <button className="button" disabled={isPending} type="submit">
          Créer
        </button>
      </form>

      <section className="form-panel">
        <h2>Categories existantes</h2>
        {categories.length > 0 ? (
          <div className="checkout-items">
            {categories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        ) : (
          <p>Aucune categorie pour le moment.</p>
        )}
      </section>
    </div>
  );
}
