"use client";

import type { FormEvent } from "react";
import { useActionState } from "react";
import { getAdminVisibilityStatusLabel } from "@/lib/adminLabels";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { ru } from "@/lib/i18n/ru";
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
  if (!window.confirm(ru.admin.categories.confirmDelete)) {
    event.preventDefault();
  }
}

function CategoryForm({ category }: { category?: AdminCategoryManagerItem }) {
  const [state, action, isPending] = useActionState(saveCategoryAction, initialState());

  return (
    <form action={action} className="form-panel">
      <h2>{category ? ru.admin.categories.edit : ru.admin.categories.create}</h2>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p>{state.success}</p> : null}
      {category ? <input name="categoryId" type="hidden" value={category.id} /> : null}
      <div className="field">
        <label htmlFor={`category-name-${category?.id ?? "new"}`}>{ru.admin.categories.name}</label>
        <input
          className="input"
          defaultValue={category?.name ?? ""}
          id={`category-name-${category?.id ?? "new"}`}
          name="name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`category-slug-${category?.id ?? "new"}`}>{ru.admin.categories.slug}</label>
        <input
          className="input"
          defaultValue={category?.slug ?? ""}
          id={`category-slug-${category?.id ?? "new"}`}
          name="slug"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`category-status-${category?.id ?? "new"}`}>{ru.admin.categories.visibility}</label>
        <select
          className="input"
          defaultValue={category?.status ?? VISIBILITY_STATUS.visible}
          id={`category-status-${category?.id ?? "new"}`}
          name="status"
        >
          <option value={VISIBILITY_STATUS.visible}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.visible)}</option>
          <option value={VISIBILITY_STATUS.hidden}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.hidden)}</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor={`category-order-${category?.id ?? "new"}`}>{ru.admin.categories.displayOrder}</label>
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
        {category ? ru.admin.common.save : ru.admin.products.create}
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
      <h3>{subcategory ? ru.admin.categories.editSubcategory : ru.admin.categories.createSubcategory}</h3>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p>{state.success}</p> : null}
      <input name="categoryId" type="hidden" value={categoryId} />
      {subcategory ? <input name="subcategoryId" type="hidden" value={subcategory.id} /> : null}
      <div className="field">
        <label htmlFor={`subcategory-name-${subcategory?.id ?? categoryId}`}>{ru.admin.categories.name}</label>
        <input
          className="input"
          defaultValue={subcategory?.name ?? ""}
          id={`subcategory-name-${subcategory?.id ?? categoryId}`}
          name="name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`subcategory-slug-${subcategory?.id ?? categoryId}`}>{ru.admin.categories.slug}</label>
        <input
          className="input"
          defaultValue={subcategory?.slug ?? ""}
          id={`subcategory-slug-${subcategory?.id ?? categoryId}`}
          name="slug"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`subcategory-status-${subcategory?.id ?? categoryId}`}>{ru.admin.categories.visibility}</label>
        <select
          className="input"
          defaultValue={subcategory?.status ?? VISIBILITY_STATUS.visible}
          id={`subcategory-status-${subcategory?.id ?? categoryId}`}
          name="status"
        >
          <option value={VISIBILITY_STATUS.visible}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.visible)}</option>
          <option value={VISIBILITY_STATUS.hidden}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.hidden)}</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor={`subcategory-order-${subcategory?.id ?? categoryId}`}>{ru.admin.categories.displayOrder}</label>
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
        {subcategory ? ru.admin.common.save : ru.admin.products.create}
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
          {ru.admin.categories.deleteSubcategory}
        </button>
      </form>
      <p>{ru.admin.categories.productCount(subcategory.products.length)}</p>
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
          {ru.admin.categories.delete}
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
        <h2>{ru.admin.categories.create}</h2>
        {state.error ? <p className="form-error">{state.error}</p> : null}
        {state.success ? <p>{state.success}</p> : null}
        <div className="field">
          <label htmlFor="new-category-name">{ru.admin.categories.name}</label>
          <input className="input" id="new-category-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="new-category-slug">{ru.admin.categories.slug}</label>
          <input className="input" id="new-category-slug" name="slug" required />
        </div>
        <div className="field">
          <label htmlFor="new-category-status">{ru.admin.categories.visibility}</label>
          <select className="input" defaultValue={VISIBILITY_STATUS.visible} id="new-category-status" name="status">
            <option value={VISIBILITY_STATUS.visible}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.visible)}</option>
            <option value={VISIBILITY_STATUS.hidden}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.hidden)}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="new-category-order">{ru.admin.categories.displayOrder}</label>
          <input className="input" defaultValue={0} id="new-category-order" min={0} name="displayOrder" type="number" />
        </div>
        <button className="button" disabled={isPending} type="submit">
          {ru.admin.products.create}
        </button>
      </form>

      <section className="form-panel">
        <h2>{ru.admin.categories.existing}</h2>
        {categories.length > 0 ? (
          <div className="checkout-items">
            {categories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        ) : (
          <p>{ru.admin.categories.empty}</p>
        )}
      </section>
    </div>
  );
}
