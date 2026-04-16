import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ mem_name: '', mem_email: '', mem_phone: '' });

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/members");
      setMembers(res.data);
      setError("");
    } catch (err) {
      setError("Could not load members. Make sure the server is running.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/members", formData);
      setFormData({ mem_name: '', mem_email: '', mem_phone: '' });
      setShowForm(false);
      fetchMembers();
    } catch (err) {
      setError("Failed to add member. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;
    try {
      await axios.delete(`http://localhost:4000/members/${id}`);
      fetchMembers();
    } catch (err) {
      setError("Failed to delete member.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-white">Library Members</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition"
          >
            {showForm ? "Cancel" : "+ Add Member"}
          </button>
        </div>

        {/* Add Member Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">New Member</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={formData.mem_name}
                onChange={(e) => setFormData({...formData, mem_name: e.target.value})}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={formData.mem_email}
                onChange={(e) => setFormData({...formData, mem_email: e.target.value})}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                required
                type="text"
                placeholder="Phone"
                value={formData.mem_phone}
                onChange={(e) => setFormData({...formData, mem_phone: e.target.value})}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="md:col-span-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition"
              >
                Save Member
              </button>
            </form>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <p className="text-gray-500 text-center py-12">Loading members...</p>
        ) : members.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No members found.</p>
            <p className="text-gray-600 text-sm mt-2">Click "+ Add Member" to register someone.</p>
          </div>
        ) : (
          /* Members Table */
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.mem_id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition">
                    <td className="px-6 py-4 text-gray-400">{member.mem_id}</td>
                    <td className="px-6 py-4 text-white font-medium">{member.mem_name}</td>
                    <td className="px-6 py-4">{member.mem_email}</td>
                    <td className="px-6 py-4">{member.mem_phone}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(member.mem_id)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
