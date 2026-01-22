import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function LeadForm() {
  const [lead, setLead] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    status: "new",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/leads/${id}`).then((res) => setLead(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/leads/${id}`, lead);
        toast.success("Lead updated ");
      } else {
        await api.post("/leads", lead);
        toast.success("Lead created ");
      }
      navigate("/leads");
    } catch (err) {
      toast.success("Failed");
    }
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 600px) {
            .lead-form-container {
              max-width: 98vw !important;
              margin: 16px auto !important;
              padding: 16px !important;
              border-radius: 10px !important;
              box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
            }
            .lead-form-title {
              font-size: 1.3rem !important;
              margin-bottom: 16px !important;
            }
            .lead-form-label {
              font-size: 1rem !important;
            }
            .lead-form-input, .lead-form-select {
              font-size: 1rem !important;
              padding: 8px 10px !important;
            }
            .lead-form-btn {
              font-size: 1rem !important;
              padding: 10px 0 !important;
            }
          }
        `}
      </style>
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-3">
        <div className="w-full max-w-md bg-[var(--card)] rounded-[var(--radius)] shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-[var(--text)] mb-6">
            {id ? "Edit Lead" : "Create New Lead"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["first_name", "last_name", "email", "city"].map((field) => (
              <input
                key={field}
                name={field}
                value={lead[field]}
                onChange={handleChange}
                placeholder={field.replace("_", " ").toUpperCase()}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required={field === "email"}
              />
            ))}

            <select
              name="status"
              value={lead.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 bg-white"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {id ? "Update Lead" : "Save Lead"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
