
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPaintings,
  deletePainting,
  createPainting,
  updatePainting,
} from "../services/paintingService";

const categories = [
  "Landscape",
  "Seascape",
  "Portrait",
  "Abstract",
  "Still Life",
  "Contemporary",
];

const initialForm = {
  title: "",
  artist: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  image: null,
};

export default function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingPainting, setEditingPainting] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-paintings", currentPage],
    queryFn: () => getPaintings({ page: currentPage }),
  });

  const paintings = data?.data || [];
  const lastPage = data?.last_page || 1;

  const resetForm = () => {
  setForm(initialForm);
  setEditingPainting(null);
  setIsFormOpen(false);
};

  const createMutation = useMutation({
    mutationFn: createPainting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-paintings"] });
      setCurrentPage(1);
      resetForm();
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updatePainting(id, formData),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-paintings"] });
        resetForm();
    },
    });

  const deleteMutation = useMutation({
    mutationFn: deletePainting,
    onSuccess: async () => {
      const updatedData = await queryClient.fetchQuery({
        queryKey: ["admin-paintings", currentPage],
        queryFn: () => getPaintings({ page: currentPage }),
      });

      if (currentPage > updatedData.last_page) {
        setCurrentPage(updatedData.last_page || 1);
      }

      queryClient.invalidateQueries({ queryKey: ["admin-paintings"] });
    },
  });

    const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== "") {
        formData.append(key, value);
        }
    });

    if (editingPainting) {
        updateMutation.mutate({
        id: editingPainting.id,
        formData,
        });
    } else {
        createMutation.mutate(formData);
    }
    };
  const handleEdit = (painting) => {
    setEditingPainting(painting);

    setForm({
        title: painting.title,
        artist: painting.artist,
        description: painting.description || "",
        price: painting.price,
        category: painting.category,
        stock: painting.stock,
        image: null,
    });

    setIsFormOpen(true);
    };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this artwork?"
    );

    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormChange = (event) => {
    const { name, value, files } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: files ? files[0] || null : value,
    }));
  };

  return (
    <main className="admin-page">
      <section className="admin-header">
        <p className="eyebrow">ARTELIER MANAGEMENT</p>
        <h1>Artwork Management</h1>
        <p>Manage your artwork collection.</p>
      </section>

      <section className="admin-content">
        <div className="admin-toolbar">
          <h2>All Artworks ({data?.total || 0})</h2>

          <button
            className="admin-add-button"
            onClick={() => {
              if (isFormOpen) {
                resetForm();
              } else {
                setIsFormOpen(true);
              }
            }}
          >
            {isFormOpen ? "Cancel" : "+ Add New Artwork"}
          </button>
        </div>

        {isFormOpen && (
          <form className="admin-form" onSubmit={handleSubmit}>
            <h3>{editingPainting ? "Edit Artwork" : "Add New Artwork"}</h3>

            <div className="admin-form-grid">
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Artist
                <input
                  type="text"
                  name="artist"
                  value={form.artist}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Price (Rp)
                <input
                  type="number"
                  name="price"
                  min="0"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Category
                <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                </label>

              <label>
                Stock
                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={form.stock}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Image
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  onChange={handleFormChange}
                />
              </label>
            </div>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </label>

            {(createMutation.isError || updateMutation.isError) && (
                <div className="admin-form-error">
                    <p>
                    {(editingPainting ? updateMutation.error : createMutation.error)
                        ?.response?.data?.message || "Failed to save artwork."}
                    </p>

                    {Object.values(
                    (editingPainting ? updateMutation.error : createMutation.error)
                        ?.response?.data?.errors || {}
                    )
                    .flat()
                    .map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
            )}

            <button
                type="submit"
                className="admin-add-button"
                disabled={createMutation.isPending || updateMutation.isPending}
                >
                {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingPainting
                    ? "Update Artwork"
                    : "Save Artwork"}
            </button>
          </form>
        )}

        {isLoading ? (
          <p>Loading artworks...</p>
        ) : isError ? (
          <p>Failed to load artworks.</p>
        ) : paintings.length > 0 ? (
          <>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paintings.map((painting) => (
                    <tr key={painting.id}>
                      <td>{painting.title}</td>
                      <td>{painting.artist}</td>
                      <td>{painting.category}</td>
                      <td>
                        Rp {Number(painting.price).toLocaleString("id-ID")}
                      </td>
                      <td>{painting.stock}</td>
                      <td>
                          <button
                                className="admin-edit-button"
                                onClick={() => handleEdit(painting)}
                            >
                                Edit
                            </button>

                            <button
                                className="admin-delete-button"
                                onClick={() => handleDelete(painting.id)}
                                disabled={deleteMutation.isPending}
                            >
                                Delete
                            </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {lastPage > 1 && (
              <div className="pagination">
                <button
                  className="filter-button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {lastPage}
                </span>

                <button
                  className="filter-button"
                  disabled={currentPage === lastPage}
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No artworks available.</p>
        )}
      </section>
    </main>
  );
}
