import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    income: "",
    savings: "",
    debts: "",
    expenses: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.createdAt) {
      // Format the createdAt date to display only the month and year
      const date = new Date(userData.createdAt);
      const options = { year: "numeric", month: "long" }; // Show month and year
      userData.createdAt = date.toLocaleDateString(undefined, options);
    }
    setUser(userData);
    setFormData({
      income: userData.income || "",
      savings: userData.savings || "",
      debts: userData.debts || "",
      expenses: userData.expenses || "",
    });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the user's data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `/api/users/update/${user._id}`,
        formData
      );

      const updatedUser = await response.data;

      // Update local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update state
      setUser(updatedUser);

      // Close the modal
      document.getElementById("edit_info").close();
      toast.success("User data updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user data");
    }
  };

  return (
    <div>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Contact No: {user.mobileNo}</p>
          <div className="w-full border border-b-2 my-3"></div>
          <section>
            <p>Income: {user.income}</p>
            <p>Expenses: {user.expenses}</p>
            <p>Savings: {user.savings}</p>
            <p>Debts: {user.debts}</p>
            <button
              className="px-3 py-2 rounded-md bg-green-500"
              onClick={() => document.getElementById("edit_info").showModal()}
            >
              Edit Info
            </button>
          </section>

          <div className="w-full border border-b-2 my-3"></div>
          {/* Displaying formatted User Since date */}
          <p>User Since: {user.createdAt}</p>
        </section>

        <section></section>
      </article>

      <dialog id="edit_info" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">Edit User Info</h3>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <label htmlFor="income" className="block">
                Income:
              </label>
              <input
                type="text"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className="input text-black bg-white input-bordered w-full"
              />
            </div>
            <div className="py-2">
              <label htmlFor="expenses" className="block">
                Expenses:
              </label>
              <input
                type="text"
                name="expenses"
                value={formData.expenses}
                onChange={handleChange}
                className="input text-black bg-white input-bordered w-full"
              />
            </div>
            <div className="py-2">
              <label htmlFor="savings" className="block">
                Savings:
              </label>
              <input
                type="text"
                name="savings"
                value={formData.savings}
                onChange={handleChange}
                className="input text-black bg-white input-bordered w-full"
              />
            </div>
            <div className="py-2">
              <label htmlFor="debts" className="block">
                Debts:
              </label>
              <input
                type="text"
                name="debts"
                value={formData.debts}
                onChange={handleChange}
                className="input text-black bg-white input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn bg-blue-500 text-white">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("edit_info").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
