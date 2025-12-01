import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleRegister } from '@/services/auth/authService';
import { toast } from 'sonner';

const articleOptions = ['Technology', 'Sports', 'Politics', 'Science', 'Travel', 'Finance'];

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    preferences: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // ----------------------------
  // Update field & clear error
  // ----------------------------
  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // clear error automatically
    setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';

    if (!form.email.includes('@')) newErrors.email = 'Invalid email';

    if (!form.dob) newErrors.dob = 'Date of birth is required';

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!passwordRegex.test(form.password))
      newErrors.password = 'Minimum 6 chars with one letter, one number, and one special char';

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    // ----------- Preference validation -----------
    if (!form.preferences.length) newErrors.preferences = 'Select at least one preference';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add / Remove preferences
  const handlePreferences = (value: string) => {
    setForm((prev) => {
      const exists = prev.preferences.includes(value);

      const updated = exists
        ? prev.preferences.filter((p) => p !== value)
        : [...prev.preferences, value];

      // Clear error when selecting
      setErrors((prevErr: any) => ({ ...prevErr, preferences: '' }));

      return { ...prev, preferences: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await handleRegister(form);
      toast.success('Registration Successful');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="hidden md:flex md:w-1/2 bg-orange items-center justify-center p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Article Feed App</h2>
            <p>Discover content, follow interests, and personalize your feed.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-orange mb-6 text-center">Create an Account</h2>

            {/* FIRST NAME */}
            <InputField
              label="First Name"
              field="firstName"
              value={form.firstName}
              error={errors.firstName}
              onChange={updateField}
            />

            {/* LAST NAME */}
            <InputField
              label="Last Name"
              field="lastName"
              value={form.lastName}
              error={errors.lastName}
              onChange={updateField}
            />

            {/* PHONE */}
            <InputField
              label="Phone"
              field="phone"
              value={form.phone}
              error={errors.phone}
              onChange={updateField}
            />

            {/* EMAIL */}
            <InputField
              label="Email"
              field="email"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={updateField}
            />

            {/* DOB */}
            <InputField
              label="Date of Birth"
              field="dob"
              type="date"
              value={form.dob}
              error={errors.dob}
              onChange={updateField}
            />

            {/* PASSWORD */}
            <InputField
              label="Password"
              field="password"
              type="password"
              value={form.password}
              error={errors.password}
              onChange={updateField}
            />

            {/* CONFIRM PASSWORD */}
            <InputField
              label="Confirm Password"
              field="confirmPassword"
              type="password"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onChange={updateField}
            />

            {/* ARTICLE PREFERENCES */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Article Preferences</label>

              <div className="grid grid-cols-2 gap-2">
                {articleOptions.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.preferences.includes(item)}
                      onChange={() => handlePreferences(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              {errors.preferences && <p className="text-red-500 text-sm">{errors.preferences}</p>}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-orange text-white py-2 rounded hover:bg-orange-dark transition flex justify-center items-center gap-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? 'Processing...' : 'Sign Up'}
            </button>

            <p className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-orange underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// Reusable Input Component
// ----------------------------
const InputField = ({ label, field, value, onChange, error, type = 'text' }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      className="w-full border px-4 py-2 rounded"
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default Signup;

// import React, { useState } from 'react';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { handleRegister } from '@/services/auth/authService';
//  import { toast } from 'sonner';

// const Signup = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState<string>('');
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//    const [loading, setLoading] = useState(false);

//   const [errors, setErrors] = useState({
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const validate = () => {
//     const newErrors = {
//       email: '',
//       username: '',
//       password: '',
//       confirmPassword: '',
//     };

//     if (!email.includes('@')) {
//       newErrors.email = 'Invalid email';
//     }

//     if (!username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (username.length < 3 || username.length > 20) {
//       newErrors.username = 'Username must be 3–20 characters long';
//     } else if (!/^[a-zA-Z0-9._]+$/.test(username)) {
//       newErrors.username = 'Username can only contain letters, numbers, dot (.), or underscore (_)';
//     } else if (/^[._]/.test(username)) {
//       newErrors.username = 'Username cannot start with a dot (.) or underscore (_)';
//     } else if (/[._]$/.test(username)) {
//       newErrors.username = 'Username cannot end with a dot (.) or underscore (_)';
//     } else if (/([._])\1/.test(username)) {
//       newErrors.username = 'Username cannot contain consecutive dots or underscores';
//     }

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
//     if (!passwordRegex.test(password)) {
//       newErrors.password =
//         'Minimum 6 characters with one letter, one number, and one special character';
//     }

//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.values(newErrors).every((e) => e === '');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) {
//       return;
//     }
//     setLoading(true);
//     try {
//       const result = await handleRegister(email, username, password);
//       localStorage.setItem('signupEmail', email);
//       toast.success('Registration Success');

//       navigate('/login');
//     } catch (error: any) {
//       console.log(error, 'front');
//       toast.error(error.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center font-poppins bg-gray-50 px-4">
//       <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white">
//         <div className="hidden md:flex md:w-1/2 bg-orange items-center justify-center p-8">
//           <div className="text-center text-white">
//             <h2 className="text-3xl font-bold mb-4">Join Article Feed App Today</h2>
//             <p className="text-base">
//               Start your journey with us — explore amazing destinations, connect with fellow
//               travelers, and book unforgettable experiences.
//             </p>
//           </div>
//         </div>

//         <div className="w-full md:w-1/2 flex items-center justify-center p-8">
//           <form onSubmit={handleSubmit} className="w-full max-w-md">
//             <h2 className="text-2xl font-bold text-orange mb-6 text-center">Create an Account</h2>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Username</label>
//               <input
//                 name="username"
//                 type="text"
//                 className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 name="email"
//                 type="email"
//                 className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input
//                 name="password"
//                 type="password"
//                 className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-1">Confirm Password</label>
//               <input
//                 name="confirmPassword"
//                 type="password"
//                 className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-orange text-white py-2 rounded hover:bg-orange-dark transition mb-4 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//               disabled={loading}
//             >
//               {loading && (
//                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//               )}
//               {loading ? 'Processing...' : 'Sign Up'}
//             </button>

//             <div className="my-4 text-center text-sm text-muted-foreground">or</div>

//             <p className="mt-4 text-sm text-center">
//               Already have an account?{' '}
//               <Link to="/login" className="text-orange underline">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
