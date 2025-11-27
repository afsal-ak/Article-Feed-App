import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/Button";
import { toast } from "sonner";
import { getUserProfile, updateUserProfile } from "@/services/user/profileService";
import type { IUser } from "@/types/IUser";
import ChangePassword from "./ChangePassword";

const articleOptions = ["Technology", "Sports", "Politics", "Science", "Travel", "Finance"];

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // errors for each field
  const [errors, setErrors] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    preferences: "",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    preferences: [] as string[],
  });

  const setError = (field: string, message: string) => {
    setErrors((prev: any) => ({ ...prev, [field]: message }));
  };

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(field, ""); // clear field error on typing
  };

  // Load user data
  const fetchUser = async () => {
    try {
      const res = await getUserProfile();
      const profile: IUser = res.userProfile;

      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        email: profile.email || "",
        dob: profile.dob ? new Date(profile.dob).toISOString().slice(0, 10) : "",
        preferences: profile.preferences || [],
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const togglePreference = (pref: string) => {
    setForm((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
    setError("preferences", "");
  };

  // VALIDATION
  const validateForm = () => {
    let valid = true;

    const fName = form.firstName.trim();
    const lName = form.lastName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const dob = form.dob;

    // First Name
    if (!fName) {
      setError("firstName", "First name is required");
      valid = false;
    } else if (fName.length < 3) {
      setError("firstName", "First name must be at least 3 characters");
      valid = false;
    }

    // Last Name
    if (!lName) {
      setError("lastName", "Last name is required");
      valid = false;
    } else if (lName.length < 2) {
      setError("lastName", "Last name must be at least 2 characters");
      valid = false;
    }
     if (!email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("email", "Email cant be empty");
      valid = false;
    }
     if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("email", "Enter a valid email");
      valid = false;
    }


    // Phone (optional)
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      setError("phone", "Phone number must be exactly 10 digits");
      valid = false;
    }

    // DOB (required)
    if (!dob) {
      setError("dob", "Date of Birth is required");
      valid = false;
    } else {
      const selected = new Date(dob);
      const today = new Date();

      if (selected > today) {
        setError("dob", "DOB cannot be a future date");
        valid = false;
      }

      const tenYearsAgo = new Date();
      tenYearsAgo.setFullYear(today.getFullYear() - 10);

      if (selected > tenYearsAgo) {
        setError("dob", "You must be at least 10 years old");
        valid = false;
      }
    }

    // Preferences
    if (form.preferences.length === 0) {
      setError("preferences", "Select at least 1 preference");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    try {
      const payload = {
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      await updateUserProfile(payload);

      toast.success("Profile updated successfully!");
      fetchUser();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border p-8 space-y-8">
            
            {/* PERSONAL INFO */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* First Name */}
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <Input
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* DOB */}
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={form.dob}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => updateField("dob", e.target.value)}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-6"></div>

            {/* PREFERENCES */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Article Preferences</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {articleOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
                  >
                    <input
                      type="checkbox"
                      checked={form.preferences.includes(item)}
                      onChange={() => togglePreference(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              {errors.preferences && (
                <p className="text-red-500 text-sm mt-1">{errors.preferences}</p>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={saving} className="w-full md:w-auto px-6 py-2">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
