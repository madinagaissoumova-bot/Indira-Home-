"use client";

import type { FormEvent } from "react";
import { useActionState, useEffect, useState } from "react";
import { getAdminVisibilityStatusLabel } from "@/lib/adminLabels";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { ru } from "@/lib/.i18n/ru";
import type { AdminCategoryManagerItem } from "@/types";
import {
  deleteCategoryAction,
  deleteSubcategoryAction,
  saveCategoryAction,
  saveSubcategoryAction,
  type AdminActionState
} from "../actions";

type CategoryManagerProps = {
  categories: AdminCategoryManagerItem[];
};

type SubcategoryRow = AdminCategoryManagerItem["subcategories"][number] & {
  categoryId: string;
  categoryName: string;
};

function initialState(): AdminActionState {
  return {};
}

function confirmDelete(event: FormEvent<HTMLFormElement>) {
  if (!window.confirm(ru.admin.categories.confirmDelete)) {
    event.preventDefault();
  }
}

function flattenSubcategories(categories: AdminCategoryManagerItem[]): SubcategoryRow[] {
  return categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      ...subcategory,
      categoryId: category.id,
      categoryName: category.name
    }))
  );
}

function CategoryTable({
  categories,
  query,
  selectedCategoryId,
  onCreateNew,
  onEdit,
  onQueryChange
}: {
  categories: AdminCategoryManagerItem[];
  query: string;
  selectedCategoryId: string | null;
  onCreateNew: () => void;
  onEdit: (categoryId: string) => void;
  onQueryChange: (value: string) => void;
}) {
  const filteredCategories = categories.filter((category) => {
    const lower = query.trim().toLowerCase();
    if (!lower) return true;

    return (
      category.name.toLowerCase().includes(lower) ||
      category.subcategories.some((subcategory) => subcategory.name.toLowerCase().includes(lower))
    );
  });

  return (
    <section className="admin-taxonomy-list">
      <div className="admin-section-heading">
        <h2>{ru.admin.categories.existing}</h2>
        <button className="button secondary admin-mini-button" onClick={onCreateNew} type="button">
          {ru.admin.categories.openCreate}
        </button>
      </div>
      <p className="admin-taxonomy-count">{ru.admin.categories.count(filteredCategories.length)}</p>
      <div className="field admin-taxonomy-search">
        <label htmlFor="category-search">{ru.admin.categories.search}</label>
        <input
          className="input"
          id="category-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={ru.admin.categories.searchPlaceholder}
          value={query}
        />
      </div>
      {filteredCategories.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{ru.admin.categories.tableName}</th>
                <th>{ru.admin.categories.visibility}</th>
                <th>{ru.admin.categories.displayOrder}</th>
                <th>{ru.admin.categories.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr className={selectedCategoryId === category.id ? "is-selected" : undefined} key={category.id}>
                  <td data-label={ru.admin.categories.tableName}>
                    <strong>{category.name}</strong>
                  </td>
                  <td data-label={ru.admin.categories.visibility}>
                    <span className="admin-badge">{getAdminVisibilityStatusLabel(category.status)}</span>
                  </td>
                  <td data-label={ru.admin.categories.displayOrder}>{category.displayOrder}</td>
                  <td data-label={ru.admin.categories.actions}>
                    <div className="admin-taxonomy-actions">
                      <button
                        className="button secondary admin-mini-button"
                        onClick={() => onEdit(category.id)}
                        type="button"
                      >
                        {ru.admin.categories.edit}
                      </button>
                      <CategoryDeleteForm categoryId={category.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{ru.admin.categories.empty}</p>
      )}
    </section>
  );
}

function CategoryDeleteForm({ categoryId }: { categoryId: string }) {
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteCategoryAction, initialState());

  return (
    <form action={deleteAction} onSubmit={confirmDelete}>
      {deleteState.error ? <p className="form-error">{deleteState.error}</p> : null}
      {deleteState.success ? <p>{deleteState.success}</p> : null}
      <input name="categoryId" type="hidden" value={categoryId} />
      <button className="button secondary admin-mini-button" disabled={isDeleting} type="submit">
        {ru.admin.categories.delete}
      </button>
    </form>
  );
}

function CategoryEditor({
  category,
  onClose
}: {
  category?: AdminCategoryManagerItem;
  onClose: () => void;
}) {
  const [state, action, isPending] = useActionState(saveCategoryAction, initialState());
  const isEditing = Boolean(category);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [onClose, state.success]);

  return (
    <form action={action} className="admin-taxonomy-editor">
      <div className="admin-section-heading">
        <h2>{isEditing ? ru.admin.categories.edit : ru.admin.categories.create}</h2>
        <button className="button secondary admin-mini-button" onClick={onClose} type="button">
          {ru.admin.categories.close}
        </button>
      </div>
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
          placeholder={ru.admin.categories.namePlaceholder}
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
        {isEditing ? ru.admin.common.save : ru.admin.categories.openCreate}
      </button>
    </form>
  );
}

function SubcategoryDeleteForm({ subcategoryId }: { subcategoryId: string }) {
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteSubcategoryAction, initialState());

  return (
    <form action={deleteAction} onSubmit={confirmDelete}>
      {deleteState.error ? <p className="form-error">{deleteState.error}</p> : null}
      {deleteState.success ? <p>{deleteState.success}</p> : null}
      <input name="subcategoryId" type="hidden" value={subcategoryId} />
      <button className="button secondary admin-mini-button" disabled={isDeleting} type="submit">
        {ru.admin.categories.deleteSubcategory}
      </button>
    </form>
  );
}

function SubcategoryEditor({
  categories,
  subcategory,
  onClose
}: {
  categories: AdminCategoryManagerItem[];
  subcategory?: SubcategoryRow;
  onClose: () => void;
}) {
  const [state, action, isPending] = useActionState(saveSubcategoryAction, initialState());
  const isEditing = Boolean(subcategory);
  const categoryId = subcategory?.categoryId ?? categories[0]?.id ?? "";

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [onClose, state.success]);

  return (
    <form action={action} className="admin-taxonomy-subeditor">
      <div className="admin-section-heading">
        <h3>{isEditing ? ru.admin.categories.editSubcategory : ru.admin.categories.createSubcategory}</h3>
        <button className="button secondary admin-mini-button" onClick={onClose} type="button">
          {ru.admin.categories.close}
        </button>
      </div>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p>{state.success}</p> : null}
      <div className="admin-subcategory-grid">
        <div className="field">
          <label htmlFor={`subcategory-category-${subcategory?.id ?? "new"}`}>{ru.admin.categories.parentCategory}</label>
          <select
            className="input"
            defaultValue={categoryId}
            id={`subcategory-category-${subcategory?.id ?? "new"}`}
            name="categoryId"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`subcategory-name-${subcategory?.id ?? "new"}`}>{ru.admin.categories.name}</label>
          <input
            className="input"
            defaultValue={subcategory?.name ?? ""}
            id={`subcategory-name-${subcategory?.id ?? "new"}`}
            name="name"
            placeholder={ru.admin.categories.namePlaceholder}
            required
          />
        </div>
        <div className="field">
          <label htmlFor={`subcategory-status-${subcategory?.id ?? "new"}`}>{ru.admin.categories.visibility}</label>
          <select
            className="input"
            defaultValue={subcategory?.status ?? VISIBILITY_STATUS.visible}
            id={`subcategory-status-${subcategory?.id ?? "new"}`}
            name="status"
          >
            <option value={VISIBILITY_STATUS.visible}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.visible)}</option>
            <option value={VISIBILITY_STATUS.hidden}>{getAdminVisibilityStatusLabel(VISIBILITY_STATUS.hidden)}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={`subcategory-order-${subcategory?.id ?? "new"}`}>{ru.admin.categories.displayOrder}</label>
          <input
            className="input"
            defaultValue={subcategory?.displayOrder ?? 0}
            id={`subcategory-order-${subcategory?.id ?? "new"}`}
            min={0}
            name="displayOrder"
            type="number"
          />
        </div>
      </div>
      {subcategory ? <input name="subcategoryId" type="hidden" value={subcategory.id} /> : null}
      <button className="button" disabled={isPending} type="submit">
        {isEditing ? ru.admin.common.save : ru.admin.categories.createSubcategoryButton}
      </button>
    </form>
  );
}

function SubcategoryTable({
  subcategories,
  onCreateNew,
  onEdit
}: {
  subcategories: SubcategoryRow[];
  onCreateNew: () => void;
  onEdit: (subcategoryId: string) => void;
}) {
  return (
    <section className="admin-taxonomy-subtable">
      <div className="admin-section-heading">
        <h2>{ru.admin.categories.subcategoriesSection}</h2>
        <button className="button secondary admin-mini-button" onClick={onCreateNew} type="button">
          {ru.admin.categories.createSubcategoryButton}
        </button>
      </div>
      {subcategories.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{ru.admin.categories.parentCategory}</th>
                <th>{ru.admin.categories.name}</th>
                <th>{ru.admin.categories.visibility}</th>
                <th>{ru.admin.categories.displayOrder}</th>
                <th>{ru.admin.categories.actions}</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory) => (
                <tr key={subcategory.id}>
                  <td data-label={ru.admin.categories.parentCategory}>{subcategory.categoryName}</td>
                  <td data-label={ru.admin.categories.name}>
                    <strong>{subcategory.name}</strong>
                  </td>
                  <td data-label={ru.admin.categories.visibility}>
                    <span className="admin-badge">{getAdminVisibilityStatusLabel(subcategory.status)}</span>
                  </td>
                  <td data-label={ru.admin.categories.displayOrder}>{subcategory.displayOrder}</td>
                  <td data-label={ru.admin.categories.actions}>
                    <div className="admin-taxonomy-actions">
                      <button
                        className="button secondary admin-mini-button"
                        onClick={() => onEdit(subcategory.id)}
                        type="button"
                      >
                        {ru.admin.categories.edit}
                      </button>
                      <SubcategoryDeleteForm subcategoryId={subcategory.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{ru.admin.categories.noSubcategories}</p>
      )}
    </section>
  );
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  const [query, setQuery] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) => {
    const lower = query.trim().toLowerCase();
    if (!lower) return true;

    return (
      category.name.toLowerCase().includes(lower) ||
      category.subcategories.some((subcategory) => subcategory.name.toLowerCase().includes(lower))
    );
  });

  const subcategories = flattenSubcategories(categories).filter((subcategory) => {
    const lower = query.trim().toLowerCase();
    if (!lower) return true;

    return (
      subcategory.name.toLowerCase().includes(lower) ||
      subcategory.categoryName.toLowerCase().includes(lower)
    );
  });

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId);
  const selectedSubcategory = flattenSubcategories(categories).find((subcategory) => subcategory.id === selectedSubcategoryId);

  return (
    <div className="admin-taxonomy-stack">
      <CategoryTable
        categories={filteredCategories}
        onCreateNew={() => {
          setSelectedCategoryId(null);
          setShowCategoryForm(true);
        }}
        onEdit={(categoryId) => {
          setSelectedCategoryId(categoryId);
          setShowCategoryForm(true);
        }}
        onQueryChange={setQuery}
        query={query}
        selectedCategoryId={selectedCategoryId}
      />
      {showCategoryForm || selectedCategory ? (
        <CategoryEditor
          category={selectedCategory}
          key={selectedCategory?.id ?? "new-category"}
          onClose={() => {
            setShowCategoryForm(false);
            setSelectedCategoryId(null);
          }}
        />
      ) : null}
      <SubcategoryTable
        onCreateNew={() => {
          setSelectedSubcategoryId(null);
          setShowSubcategoryForm(true);
        }}
        onEdit={(subcategoryId) => {
          setSelectedSubcategoryId(subcategoryId);
          setShowSubcategoryForm(true);
        }}
        subcategories={subcategories}
      />
      {showSubcategoryForm || selectedSubcategory ? (
        <SubcategoryEditor
          categories={categories}
          key={selectedSubcategory?.id ?? "new-subcategory"}
          subcategory={selectedSubcategory}
          onClose={() => {
            setShowSubcategoryForm(false);
            setSelectedSubcategoryId(null);
          }}
        />
      ) : null}
    </div>
  );
}
