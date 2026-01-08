// "use client";

// import type React from "react";

// import { useState, useRef, useEffect, useMemo } from "react";

// import {
//   User,
//   Settings,
//   Lock,
//   Camera,
//   Save,
//   X,
//   CheckCircle2,
//   Loader2,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { authCheck } from "@/services/authCheck";
// import axios from "axios";
// import Select from "react-select";
// import countryList from "react-select-country-list";
// import { provinceToCities } from "@/lib/province-to-cities";

// type AddressType = "canadian" | "international";

// type ProfileErrors = {
//   profilePic?: string;
//   profile?: string;
//   password?: string;

//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phone?: string;

//   country?: string;
//   province?: string;
//   state?: string;
//   city?: string;

//   address?: string;
//   postalCode?: string;
// };

// interface CanadianProvince {
//   canadian_province_id: number;
//   canadian_province_name: string;
// }

// interface CanadianCity {
//   canadian_city_id: number;
//   canadian_city_name: string;
//   canadian_province_id: number;
// }




// const canadianAddressRegex = /^\d+\s+[A-Za-z0-9\s,'-]+$/;
// const canadianPostalRegex = /^[A-Z]\d[A-Z][ ]?\d[A-Z]\d$/;
// const PROVINCE_CITIES: Record<string, string[]> = provinceToCities;
// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

// const toOption = (value: string) => (value ? { value, label: value } : null);

// const selectStyles = {
//   control: (base: any) => ({
//     ...base,
//     borderColor: "#e5e7eb",
//     borderRadius: "0.75rem",
//     padding: "0.25rem 0",
//     "&:hover": { borderColor: "#59A5B2" },
//     "&:focus": {
//       borderColor: "#59A5B2",
//       boxShadow: "0 0 0 2px rgba(89, 165, 178, 0.2)",
//     },
//   }),
//   option: (base: any, state: any) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? "#59A5B2"
//       : state.isFocused
//         ? "#f0f9fa"
//         : "white",
//     color: state.isSelected ? "white" : "#374151",
//     cursor: "pointer",
//   }),
// };

// export default function CustomerProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profilePic, setProfilePic] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null); // New state for file
//   const [isSaving, setIsSaving] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [user, setUser] = useState<any>(null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   const [addressType, setAddressType] = useState<AddressType>("canadian");

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     country: { value: "CA", label: "Canada" } as any,
//     province: "",
//     state: "",
//     city: "",
//     address: "",
//     postalCode: "",
//     canadian_provinceid: "",
//     canadian_cityid: "",
//     isGoogleUser:false
//   });

//   const [passwordData, setPasswordData] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });

//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   const [canadianProvinces, setCanadianProvinces] = useState<
//     CanadianProvince[]
//   >([]);
//   const [canadianCities, setCanadianCities] = useState<CanadianCity[]>([]);

//   const [errors, setErrors] = useState<ProfileErrors>({});

//   const countryOptions = useMemo(
//     () =>
//       countryList()
//         .getData()
//         .map((c) => ({ value: c.value, label: c.label })),
//     []
//   );

//   useEffect(() => {
//     const fetchCanadianProvinces = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/auth/getCanadianProvinces`);
//         const data = await response.json();
//         setCanadianProvinces(data.provinces || []);
//       } catch (error) {
//         console.error("Error fetching Canadian provinces:", error);
//       }
//     };

//     fetchCanadianProvinces();
//   }, []);

//   useEffect(() => {
//     if (profileData.canadian_provinceid) {
//       fetch(
//         `${baseUrl}/auth/getCanadianCities/${profileData.canadian_provinceid}`
//       )
//         .then((res) => res.json())
//         .then((data) => setCanadianCities(data.cities || []))
//         .catch((err) => console.error("Error loading cities:", err));
//     }
//   }, [profileData.canadian_provinceid]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await authCheck();

//         if (res?.user) {
//           const u = res.user;

//           // Detect address type based on user object
//           const isCanadian =
//             u.canadian_cityid &&
//             u.canadian_provinceid &&
//             !u.international_country;

//           setUser(u);
//           setAddressType(isCanadian ? "canadian" : "international");

//           if (isCanadian) {
//             setProfileData({
//               firstName: u.firstname ?? "",
//               lastName: u.lastname ?? "",
//               email: u.email ?? "",
//               phone: u.phoneno ?? "",
//               country: { value: "CA", label: "Canada" },
//               province: "",
//               state: "",
//               city: "",
//               address: u.address ?? "",
//               postalCode: u.postalcode ?? "",
//               canadian_provinceid: String(u.canadian_provinceid) || "",
//               canadian_cityid: String(u.canadian_cityid) || "",
//               isGoogleUser: u.isGoogleUser,
//             });
//           } else {
//             setProfileData({
//               firstName: u.firstname ?? "",
//               lastName: u.lastname ?? "",
//               email: u.email ?? "",
//               phone: u.phoneno ?? "",
//               country: u.international_country
//                 ? {
//                   value: u.international_country,
//                   label: u.international_country,
//                 }
//                 : null,
//               province: u.international_province ?? "",
//               state: u.international_province ?? "",
//               city: u.international_city ?? "",
//               address: u.address ?? "",
//               postalCode: u.postalcode ?? "",
//               canadian_provinceid: "",
//               canadian_cityid: "",
//               isGoogleUser: u.isGoogleUser,
//             });
//           }

//           setProfilePic(u.profilepic || null);
//         }
//       } catch (err) {
//         toast.error("Failed to load profile data");
//       } finally {
//         setLoadingUser(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const setField = (key: string, value: any) => {
//     setProfileData((prev: any) => ({ ...prev, [key]: value }));
//   };

//   const validateField = (field: string, value: any): boolean => {
//     if (!isEditing) return true;

//     const val = typeof value === "string" ? value.trim() : value;
//     let msg = "";

//     switch (field) {
//       case "firstName":
//       case "lastName":
//         if (!val) msg = "This field is required.";
//         else if (!/^[A-Za-z ]{1,20}$/.test(val))
//           msg = "Letters and spaces only.";
//         break;
//       case "email":
//         if (!val) msg = "Email is required.";
//         else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val))
//           msg = "Invalid email address.";
//         break;
//       case "phone":
//         if (!val) msg = "Phone is required.";
//         else if (!/^\d+$/.test(val)) msg = "Digits only.";
//         else if (val.length !== 10) msg = "Must be 10 digits.";
//         break;
//       case "address":
//         if (!val) msg = "Address is required.";
//         else {
//           const isCanadianFlow = addressType === "canadian";
//           if (isCanadianFlow && !canadianAddressRegex.test(val)) {
//             msg = "Use a Canadian Street Address (e.g., 123 Queen Street W).";
//           } else if (!isCanadianFlow && val.length < 6) {
//             msg = "Address must be at least 6 characters.";
//           }
//         }
//         break;
//       case "postalCode":
//         if (!val) msg = "Postal code is required.";
//         else {
//           const isCanadianFlow = addressType === "canadian";
//           const upperVal = String(val).toUpperCase();
//           if (isCanadianFlow && !canadianPostalRegex.test(upperVal)) {
//             msg = "Format: A1A 1A1";
//           } else if (!isCanadianFlow && val.length < 4) {
//             msg = "Postal/ZIP code must be at least 4 characters.";
//           }
//         }
//         break;
//       case "province":
//         if (addressType === "canadian" && !val)
//           msg = "Please select a province.";
//         break;
//       case "state":
//         if (
//           addressType === "international" &&
//           profileData.country?.value !== "CA" &&
//           !val
//         ) {
//           msg = "State/Province is required.";
//         }
//         break;
//       case "city":
//         if (!val) msg = "City is required.";
//         break;
//       case "country":
//         if (addressType === "international" && !val)
//           msg = "Country is required.";
//         break;
//     }

//     if (msg) {
//       setErrors((prev: any) => ({ ...prev, [field]: msg }));
//       return false;
//     }
//     setErrors((prev: any) => ({ ...prev, [field]: undefined }));
//     return true;
//   };

//   const validateCanadianAddress = (): boolean => {
//     const checks: [string, any][] = [
//       ["firstName", profileData.firstName],
//       ["lastName", profileData.lastName],
//       ["email", profileData.email],
//       ["phone", profileData.phone],
//       ["address", profileData.address],
//       ["postalCode", profileData.postalCode],
//       ["province", profileData.canadian_provinceid],
//       ["city", profileData.canadian_cityid],
//     ];

//     return checks.every(([field, value]) => validateField(field, value));
//   };

//   const validateInternationalAddress = (): boolean => {
//     const checks: [string, any][] = [
//       ["firstName", profileData.firstName],
//       ["lastName", profileData.lastName],
//       ["email", profileData.email],
//       ["phone", profileData.phone],
//       ["address", profileData.address],
//       ["postalCode", profileData.postalCode],
//       ["country", profileData.country],
//     ];

//     if (profileData.country?.value === "CA") {
//       checks.push(["province", profileData.province]);
//       checks.push(["city", profileData.city]);
//     } else {
//       checks.push(["state", profileData.state]);
//       checks.push(["city", profileData.city]);
//     }

//     return checks.every(([field, value]) => validateField(field, value));
//   };

//   const validateAll = (): boolean => {
//     if (addressType === "canadian") {
//       return validateCanadianAddress();
//     } else {
//       return validateInternationalAddress();
//     }
//   };

//   // --- Profile Update Handler ---
//   const handleProfileUpdate = async () => {
//     setErrors({});
//     if (!validateAll()) return;

//     setIsSaving(true);

//     try {
//       const formData = new FormData();
//       formData.append("firstname", profileData.firstName);
//       formData.append("lastname", profileData.lastName);
//       formData.append("phoneno", profileData.phone);
//       formData.append("address", profileData.address);
//       formData.append("postalcode", profileData.postalCode);
//       formData.append("email", profileData.email);

//       if (addressType === "canadian") {
//         formData.append("canadian_provinceid", profileData.canadian_provinceid);
//         formData.append("canadian_cityid", profileData.canadian_cityid);
//         // International fields are null/empty, usually not sent or handled by backend to nullify
//         formData.append("isCanadian", "true");
//       } else {
//         formData.append("international_country", profileData.country?.label || "");
//         formData.append(
//           "international_province",
//           profileData.country?.value === "CA" ? profileData.province : profileData.state
//         );
//         formData.append("international_city", profileData.city);
//         formData.append("isCanadian", "false");
//       }

//       // Append profile picture if selected
//       if (selectedFile) {
//         formData.append("profilepic", selectedFile);
//       }

//       await axios.put(`${baseUrl}/auth/updateCustomerInfoProfile`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Profile updated successfully. Please sign in again.");
//       setIsEditing(false);
//       // Optional: Refresh page or redirect to login as backend refreshes token
//       window.location.reload(); 
//     } catch (error: any) {
//       console.error(error);
//       setErrors({ profile: error.response?.data?.message || "Failed to update profile. Try again." });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // --- Password Update Handler ---
//   const handlePasswordUpdate = async () => {
//     setErrors({});
//     if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
//         setErrors({ password: "Please fill in all password fields" });
//         return;
//     }
//     if (passwordData.new !== passwordData.confirm) {
//         setErrors({ password: "New passwords do not match" });
//         return;
//     }
//     if (passwordData.new.length < 8) {
//         setErrors({ password: "Password must be at least 8 characters" });
//         return;
//     }

//     setIsSaving(true);
//     try {
//         await axios.post(
//           `${baseUrl}/auth/changePassword`,
//           {
//             currentPassword: passwordData.current,
//             newPassword: passwordData.new,
//           },
//           { withCredentials: true }
//         );
//         toast.success("Password updated successfully");
//         setPasswordData({ current: "", new: "", confirm: "" });
//     } catch (error: any) {
//         console.error(error);
//         setErrors({ password: error.response?.data?.message || "Failed to update password." });
//     } finally {
//         setIsSaving(false);
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 1048576) {
//       setErrors({ profilePic: "Image size must be less than 1 MB" });
//       toast.error("Image size must be less than 1 MB");
//       return;
//     }

//     setErrors((prev: any) => ({ ...prev, profilePic: undefined }));
//     setSelectedFile(file);
    
//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfilePic(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   if (loadingUser) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-[#59A5B2]" />
//       </div>
//     );
//   }

//   const getUserRoleLabel = () => {
//     if (user?.roleid === 1) return "Admin";
//     if (user?.roleid === 2) return "Owner";
//     return "Customer";
//   };

//   return (
//     <main className="flex-1 site-container py-12">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
//             <div className="relative group">
//               <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f0f9fa] relative bg-gray-100 flex-shrink-0">
//                 {profilePic ? (
//                   <img
//                     src={profilePic || "/placeholder.svg"}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-400">
//                     <User className="w-16 h-16" />
//                   </div>
//                 )}
//               </div>
//               {isEditing && (
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="absolute bottom-0 right-0 bg-[#59A5B2] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
//                 title="Change profile picture"
//               >
//                 <Camera className="w-5 h-5" />
//               </button>
//               )}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </div>

//             <div className="flex-1">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {profileData.firstName} {profileData.lastName}
//               </h1>
//               <p className="text-gray-500 mb-4 flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-green-500" />
//                 Verified Account
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
//                   {getUserRoleLabel()}
//                 </span>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${isEditing
//                   ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   : "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-lg shadow-[#59A5B2]/20"
//                 }`}
//             >
//               {isEditing ? (
//                 <>
//                   <X className="w-5 h-5" /> Cancel
//                 </>
//               ) : (
//                 <>
//                   <Settings className="w-5 h-5" /> Edit Profile
//                 </>
//               )}
//             </button>
//           </div>

//           {errors.profilePic && (
//             <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-200">
//               {errors.profilePic}
//             </div>
//           )}
//         </div>

//         {/* --- Profile Information Form --- */}
//         <div className="space-y-8">
//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                 <User className="w-5 h-5 text-[#59A5B2]" />
//                 Personal Information
//                 </h2>
//                 {isEditing && (
//                     <button
//                         onClick={handleProfileUpdate}
//                         disabled={isSaving}
//                         className="bg-[#59A5B2] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#4a8a95] transition-all flex items-center gap-2 disabled:opacity-50"
//                     >
//                         {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                         Save Changes
//                     </button>
//                 )}
//             </div>

//             {errors.profile && (
//               <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-200">
//                 {errors.profile}
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 { label: "First Name", key: "firstName", type: "text" },
//                 { label: "Last Name", key: "lastName", type: "text" },
//                 { label: "Email Address", key: "email", type: "email" },
//                 { label: "Phone Number", key: "phone", type: "tel" },
//               ].map((field) => (
//                 <div key={field.key} className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700">
//                     {field.label}
//                   </label>
//                   <input
//                     type={field.type}
//                     disabled={!isEditing}
//                     value={
//                       profileData[
//                       field.key as keyof typeof profileData
//                       ] as string
//                     }
//                     onChange={(e) => setField(field.key, e.target.value)}
//                     onBlur={(e) =>
//                       isEditing && validateField(field.key, e.target.value)
//                     }
//                     className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${errors[field.key as keyof typeof errors]
//                         ? "border-red-500 focus:border-red-500"
//                         : "border-gray-200 focus:border-[#59A5B2]"
//                       }`}
//                   />
//                   {errors[field.key as keyof typeof errors] && (
//                     <p className="text-xs text-red-500">
//                       {errors[field.key as keyof typeof errors]}
//                     </p>
//                   )}
//                 </div>
//               ))}

//               {isEditing && (
//                 <div className="md:col-span-2">
//                   {/* <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-xl">
//                     <div className="flex items-center gap-2">
//                       <input
//                         id="addr-ca"
//                         type="radio"
//                         name="addr-type"
//                         checked={addressType === "canadian"}
//                         onChange={() => {
//                           setAddressType("canadian");
//                           setField("country", {
//                             value: "CA",
//                             label: "Canada",
//                           });
//                           setField("state", "");
//                           setField("canadian_provinceid", "");
//                           setField("canadian_cityid", "");
//                         }}
//                         className="h-4 w-4 accent-[#59A5B2]"
//                       />
//                       <label
//                         htmlFor="addr-ca"
//                         className="text-sm font-medium text-gray-700"
//                       >
//                         Canadian Address
//                       </label>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <input
//                         id="addr-intl"
//                         type="radio"
//                         name="addr-type"
//                         checked={addressType === "international"}
//                         onChange={() => {
//                           setAddressType("international");
//                           setField("canadian_provinceid", "");
//                           setField("canadian_cityid", "");
//                         }}
//                         className="h-4 w-4 accent-[#59A5B2]"
//                       />
//                       <label
//                         htmlFor="addr-intl"
//                         className="text-sm font-medium text-gray-700"
//                       >
//                         International Address
//                       </label>
//                     </div>
//                   </div> */}
//                 </div>
//               )}

//               {/* Conditional Rendering logic is preserved - only checking AddressType */}
//               {/* If addressType is "canadian", we show Province/City Dropdowns */}
//               {/* If "international", we show Country dropdown and text inputs */}
              
//               {addressType === "canadian" && (
//                 <>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">
//                       Country
//                     </label>
//                     <input
//                       type="text"
//                       disabled
//                       value="Canada"
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">
//                       Province
//                     </label>
//                     <Select
//                       instanceId="profile-province"
//                       isDisabled={!isEditing}
//                       options={canadianProvinces.map((p) => ({
//                         value: String(p.canadian_province_id),
//                         label: p.canadian_province_name,
//                       }))}
//                       value={
//                         (canadianProvinces || [])
//                           .map((c) => ({
//                             value: String(c.canadian_province_id),
//                             label: c.canadian_province_name,
//                           }))
//                           .find(
//                             (opt) =>
//                               opt.value ===
//                               String(profileData.canadian_provinceid)
//                           ) || null
//                       }
//                       onChange={(opt: any) => {
//                         setField(
//                           "canadian_provinceid",
//                           opt ? Number.parseInt(opt.value) : ""
//                         );
//                         setField("province", opt?.label || "");
//                         setField("canadian_cityid", "");
//                       }}
//                       styles={selectStyles}
//                       placeholder="Select province"
//                     />
//                     {errors.province && (
//                       <p className="text-xs text-red-500">
//                         {errors.province}
//                       </p>
//                     )}
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">
//                       City
//                     </label>
//                     <Select
//                       instanceId="profile-city"
//                       isDisabled={
//                         !isEditing || !profileData.canadian_provinceid
//                       }
//                       options={(canadianCities || []).map((c) => ({
//                         value: String(c.canadian_city_id),
//                         label: c.canadian_city_name,
//                       }))}
//                       value={
//                         (canadianCities || [])
//                           .map((c: { canadian_city_id: any; canadian_city_name: any; }) => ({
//                             value: String(c.canadian_city_id),
//                             label: c.canadian_city_name,
//                           }))
//                           .find(
//                             (opt: { value: string; }) =>
//                               opt.value ===
//                               String(profileData.canadian_cityid)
//                           ) || null
//                       }
//                       onChange={(opt: any) => {
//                         setField(
//                           "canadian_cityid",
//                           opt ? Number.parseInt(opt.value) : ""
//                         );
//                         setField("city", opt?.label || "");
//                       }}
//                       styles={selectStyles}
//                       placeholder={
//                         profileData.canadian_provinceid
//                           ? "Select city"
//                           : "Select province first"
//                       }
//                     />
//                     {errors.city && (
//                       <p className="text-xs text-red-500">{errors.city}</p>
//                     )}
//                   </div>
//                 </>
//               )}

//               {addressType === "international" && (
//                 <>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">
//                       Country
//                     </label>
//                     <Select
//                       instanceId="profile-country"
//                       isDisabled={!isEditing}
//                       options={countryOptions}
//                       value={profileData.country}
//                       onChange={(opt: any) => {
//                         setField("country", opt);
//                         setField("province", "");
//                         setField("state", "");
//                         setField("city", "");
//                       }}
//                       styles={selectStyles}
//                       placeholder="Select country"
//                     />
//                     {errors.country && (
//                       <p className="text-xs text-red-500">{errors.country}</p>
//                     )}
//                   </div>

//                   {/* If country is manually selected as Canada in international list (edge case), handle appropriately or just general */}
//                   {profileData.country?.value === "CA" ? (
//                     <div className="space-y-2">
//                       <label className="text-sm font-semibold text-gray-700">
//                         Province
//                       </label>
//                       <input
//                         disabled={!isEditing}
//                         placeholder="Province"
//                         value={profileData.province}
//                         onChange={(e) => setField("province", e.target.value)}
//                         className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
//                       />
//                       {errors.province && (
//                         <p className="text-xs text-red-500">
//                           {errors.province}
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="space-y-2">
//                       <label className="text-sm font-semibold text-gray-700">
//                         Province / State
//                       </label>
//                       <input
//                         disabled={!isEditing}
//                         placeholder="Province/State"
//                         value={profileData.state}
//                         onChange={(e) => setField("state", e.target.value)}
//                         className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
//                       />
//                       {errors.state && (
//                         <p className="text-xs text-red-500">{errors.state}</p>
//                       )}
//                     </div>
//                   )}

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">
//                       City
//                     </label>
//                     <input
//                       disabled={!isEditing}
//                       placeholder="City"
//                       value={profileData.city}
//                       onChange={(e) => setField("city", e.target.value)}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                     {errors.city && (
//                       <p className="text-xs text-red-500">{errors.city}</p>
//                     )}
//                   </div>
//                 </>
//               )}

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">
//                   Address
//                 </label>
//                 <input
//                   disabled={!isEditing}
//                   placeholder="Street Address"
//                   value={profileData.address}
//                   onChange={(e) => setField("address", e.target.value)}
//                   onBlur={(e) =>
//                     isEditing && validateField("address", e.target.value)
//                   }
//                   className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 ${errors.address
//                       ? "border-red-500 focus:border-red-500"
//                       : "border-gray-200 focus:border-[#59A5B2]"
//                     }`}
//                 />
//                 {errors.address && (
//                   <p className="text-xs text-red-500">{errors.address}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">
//                   {addressType === "canadian"
//                     ? "Postal Code"
//                     : "Postal / ZIP"}
//                 </label>
//                 <input
//                   disabled={!isEditing}
//                   placeholder={
//                     addressType === "canadian" ? "A1A 1A1" : "ZIP / Postal"
//                   }
//                   value={profileData.postalCode}
//                   onChange={(e) => setField("postalCode", e.target.value)}
//                   onBlur={(e) =>
//                     isEditing && validateField("postalCode", e.target.value)
//                   }
//                   className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 ${errors.postalCode
//                       ? "border-red-500 focus:border-red-500"
//                       : "border-gray-200 focus:border-[#59A5B2]"
//                     }`}
//                 />
//                 {errors.postalCode && (
//                   <p className="text-xs text-red-500">{errors.postalCode}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* --- Security Settings Form (Separate Button) --- */}

//           {
//           profileData.isGoogleUser == false &&(
//           isEditing && (
//             <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                     <Lock className="w-5 h-5 text-[#59A5B2]" />
//                     Security Settings (Optional)
//                   </h2>
//                   <button
//                         onClick={handlePasswordUpdate}
//                         disabled={isSaving}
//                         className="bg-[#59A5B2] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#4a8a95] transition-all flex items-center gap-2 disabled:opacity-50"
//                     >
//                         {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                         Update Password
//                     </button>
//               </div>

//               <p className="text-gray-600 text-sm mb-6">
//                 Leave these fields empty if you don't want to change your
//                 password
//               </p>

//               {errors.password && (
//                 <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-200">
//                   {errors.password}
//                 </div>
//               )}

//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700">
//                     Current Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPasswords.current ? "text" : "password"}
//                       value={passwordData.current}
//                       onChange={(e) =>
//                         setPasswordData({
//                           ...passwordData,
//                           current: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPasswords({
//                           ...showPasswords,
//                           current: !showPasswords.current,
//                         })
//                       }
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPasswords.current ? (
//                         <EyeOff className="w-5 h-5" />
//                       ) : (
//                         <Eye className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700">
//                     New Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPasswords.new ? "text" : "password"}
//                       value={passwordData.new}
//                       onChange={(e) =>
//                         setPasswordData({
//                           ...passwordData,
//                           new: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPasswords({
//                           ...showPasswords,
//                           new: !showPasswords.new,
//                         })
//                       }
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPasswords.new ? (
//                         <EyeOff className="w-5 h-5" />
//                       ) : (
//                         <Eye className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPasswords.confirm ? "text" : "password"}
//                       value={passwordData.confirm}
//                       onChange={(e) =>
//                         setPasswordData({
//                           ...passwordData,
//                           confirm: e.target.value,
//                         })
//                       }
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPasswords({
//                           ...showPasswords,
//                           confirm: !showPasswords.confirm,
//                         })
//                       }
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPasswords.confirm ? (
//                         <EyeOff className="w-5 h-5" />
//                       ) : (
//                         <Eye className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )
        
//         )}
//         </div>
//       </div>
//     </main>
//   );
// }




"use client";

import type React from "react";

import { useState, useRef, useEffect, useMemo } from "react";

import {
  User,
  Settings,
  Lock,
  Camera,
  Save,
  X,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { authCheck } from "@/services/authCheck";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import { provinceToCities } from "@/lib/province-to-cities";

type AddressType = "canadian" | "international";

type ProfileErrors = {
  profilePic?: string;
  profile?: string;
  password?: string;

  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;

  country?: string;
  province?: string;
  state?: string;
  city?: string;

  address?: string;
  postalCode?: string;
};

interface CanadianProvince {
  canadian_province_id: number;
  canadian_province_name: string;
}

interface CanadianCity {
  canadian_city_id: number;
  canadian_city_name: string;
  canadian_province_id: number;
}




const canadianAddressRegex = /^\d+\s+[A-Za-z0-9\s,'-]+$/;
const canadianPostalRegex = /^[A-Z]\d[A-Z][ ]?\d[A-Z]\d$/;
const PROVINCE_CITIES: Record<string, string[]> = provinceToCities;
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

const toOption = (value: string) => (value ? { value, label: value } : null);

const selectStyles = {
  control: (base: any) => ({
    ...base,
    borderColor: "#e5e7eb",
    borderRadius: "0.75rem",
    padding: "0.25rem 0",
    "&:hover": { borderColor: "#59A5B2" },
    "&:focus": {
      borderColor: "#59A5B2",
      boxShadow: "0 0 0 2px rgba(89, 165, 178, 0.2)",
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#59A5B2"
      : state.isFocused
        ? "#f0f9fa"
        : "white",
    color: state.isSelected ? "white" : "#374151",
    cursor: "pointer",
  }),
};

export default function CustomerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // New state for file
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [addressType, setAddressType] = useState<AddressType>("canadian");

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: { value: "CA", label: "Canada" } as any,
    province: "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
    canadian_provinceid: "",
    canadian_cityid: "",
    isGoogleUser:false
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [canadianProvinces, setCanadianProvinces] = useState<
    CanadianProvince[]
  >([]);
  const [canadianCities, setCanadianCities] = useState<CanadianCity[]>([]);

  const [errors, setErrors] = useState<ProfileErrors>({});

  const countryOptions = useMemo(
    () =>
      countryList()
        .getData()
        .map((c) => ({ value: c.value, label: c.label })),
    []
  );

  useEffect(() => {
    const fetchCanadianProvinces = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/getCanadianProvinces`);
        const data = await response.json();
        setCanadianProvinces(data.provinces || []);
      } catch (error) {
        console.error("Error fetching Canadian provinces:", error);
      }
    };

    fetchCanadianProvinces();
  }, []);

  useEffect(() => {
    if (profileData.canadian_provinceid) {
      fetch(
        `${baseUrl}/auth/getCanadianCities/${profileData.canadian_provinceid}`
      )
        .then((res) => res.json())
        .then((data) => setCanadianCities(data.cities || []))
        .catch((err) => console.error("Error loading cities:", err));
    }
  }, [profileData.canadian_provinceid]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authCheck();

        if (res?.user) {
          const u = res.user;

          // Detect address type based on user object
          const isCanadian =
            u.canadian_cityid &&
            u.canadian_provinceid &&
            !u.international_country;

          setUser(u);
          setAddressType(isCanadian ? "canadian" : "international");

          if (isCanadian) {
            setProfileData({
              firstName: u.firstname ?? "",
              lastName: u.lastname ?? "",
              email: u.email ?? "",
              phone: u.phoneno ?? "",
              country: { value: "CA", label: "Canada" },
              province: "",
              state: "",
              city: "",
              address: u.address ?? "",
              postalCode: u.postalcode ?? "",
              canadian_provinceid: String(u.canadian_provinceid) || "",
              canadian_cityid: String(u.canadian_cityid) || "",
              isGoogleUser: u.isGoogleUser,
            });
          } else {
            setProfileData({
              firstName: u.firstname ?? "",
              lastName: u.lastname ?? "",
              email: u.email ?? "",
              phone: u.phoneno ?? "",
              country: u.international_country
                ? {
                  value: u.international_country,
                  label: u.international_country,
                }
                : null,
              province: u.international_province ?? "",
              state: u.international_province ?? "",
              city: u.international_city ?? "",
              address: u.address ?? "",
              postalCode: u.postalcode ?? "",
              canadian_provinceid: "",
              canadian_cityid: "",
              isGoogleUser: u.isGoogleUser,
            });
          }

          setProfilePic(u.profilepic || null);
        }
      } catch (err) {
        toast.error("Failed to load profile data");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const setField = (key: string, value: any) => {
    setProfileData((prev: any) => ({ ...prev, [key]: value }));
  };

  const validateField = (field: string, value: any): boolean => {
    if (!isEditing) return true;

    const val = typeof value === "string" ? value.trim() : value;
    let msg = "";

    switch (field) {
      case "firstName":
      case "lastName":
        if (!val) msg = "This field is required.";
        else if (!/^[A-Za-z ]{1,20}$/.test(val))
          msg = "Letters and spaces only.";
        break;
      case "email":
        if (!val) msg = "Email is required.";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val))
          msg = "Invalid email address.";
        break;
      case "phone":
        if (!val) msg = "Phone is required.";
        else if (!/^\d+$/.test(val)) msg = "Digits only.";
        else if (val.length !== 10) msg = "Must be 10 digits.";
        break;
      case "address":
        if (!val) msg = "Address is required.";
        else {
          const isCanadianFlow = addressType === "canadian";
          if (isCanadianFlow && !canadianAddressRegex.test(val)) {
            msg = "Use a Canadian Street Address (e.g., 123 Queen Street W).";
          } else if (!isCanadianFlow && val.length < 6) {
            msg = "Address must be at least 6 characters.";
          }
        }
        break;
      case "postalCode":
        if (!val) msg = "Postal code is required.";
        else {
          const isCanadianFlow = addressType === "canadian";
          const upperVal = String(val).toUpperCase();
          if (isCanadianFlow && !canadianPostalRegex.test(upperVal)) {
            msg = "Format: A1A 1A1";
          } else if (!isCanadianFlow && val.length < 4) {
            msg = "Postal/ZIP code must be at least 4 characters.";
          }
        }
        break;
      case "province":
        if (addressType === "canadian" && !val)
          msg = "Please select a province.";
        break;
      case "state":
        if (
          addressType === "international" &&
          profileData.country?.value !== "CA" &&
          !val
        ) {
          msg = "State/Province is required.";
        }
        break;
      case "city":
        if (!val) msg = "City is required.";
        break;
      case "country":
        if (addressType === "international" && !val)
          msg = "Country is required.";
        break;
    }

    if (msg) {
      setErrors((prev: any) => ({ ...prev, [field]: msg }));
      return false;
    }
    setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    return true;
  };

  const validateCanadianAddress = (): boolean => {
    const checks: [string, any][] = [
      ["firstName", profileData.firstName],
      ["lastName", profileData.lastName],
      ["email", profileData.email],
      ["phone", profileData.phone],
      ["address", profileData.address],
      ["postalCode", profileData.postalCode],
      ["province", profileData.canadian_provinceid],
      ["city", profileData.canadian_cityid],
    ];

    return checks.every(([field, value]) => validateField(field, value));
  };

  const validateInternationalAddress = (): boolean => {
    const checks: [string, any][] = [
      ["firstName", profileData.firstName],
      ["lastName", profileData.lastName],
      ["email", profileData.email],
      ["phone", profileData.phone],
      ["address", profileData.address],
      ["postalCode", profileData.postalCode],
      ["country", profileData.country],
    ];

    if (profileData.country?.value === "CA") {
      checks.push(["province", profileData.province]);
      checks.push(["city", profileData.city]);
    } else {
      checks.push(["state", profileData.state]);
      checks.push(["city", profileData.city]);
    }

    return checks.every(([field, value]) => validateField(field, value));
  };

  const validateAll = (): boolean => {
    if (addressType === "canadian") {
      return validateCanadianAddress();
    } else {
      return validateInternationalAddress();
    }
  };

  // --- Profile Update Handler ---
  const handleProfileUpdate = async () => {
    setErrors({});
    if (!validateAll()) return;

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("firstname", profileData.firstName);
      formData.append("lastname", profileData.lastName);
      formData.append("phoneno", profileData.phone);
      formData.append("address", profileData.address);
      formData.append("postalcode", profileData.postalCode);
      formData.append("email", profileData.email);

      if (addressType === "canadian") {
        formData.append("canadian_provinceid", profileData.canadian_provinceid);
        formData.append("canadian_cityid", profileData.canadian_cityid);
        // International fields are null/empty, usually not sent or handled by backend to nullify
        formData.append("isCanadian", "true");
      } else {
        formData.append("international_country", profileData.country?.label || "");
        formData.append(
          "international_province",
          profileData.country?.value === "CA" ? profileData.province : profileData.state
        );
        formData.append("international_city", profileData.city);
        formData.append("isCanadian", "false");
      }

      // Append profile picture if selected
      if (selectedFile) {
        formData.append("profilepic", selectedFile);
      }

      await axios.put(`${baseUrl}/auth/updateCustomerInfoProfile`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully. Please sign in again.");
      setIsEditing(false);
      // Optional: Refresh page or redirect to login as backend refreshes token
      window.location.reload(); 
    } catch (error: any) {
      console.error(error);
      setErrors({ profile: error.response?.data?.message || "Failed to update profile. Try again." });
    } finally {
      setIsSaving(false);
    }
  };

  // --- Password Update Handler ---
  const handlePasswordUpdate = async () => {
    setErrors({});
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
        setErrors({ password: "Please fill in all password fields" });
        return;
    }
    if (passwordData.new !== passwordData.confirm) {
        setErrors({ password: "New passwords do not match" });
        return;
    }
    if (passwordData.new.length < 8) {
        setErrors({ password: "Password must be at least 8 characters" });
        return;
    }

    setIsSaving(true);
    try {
        await axios.post(
          `${baseUrl}/auth/changePassword`,
          {
            currentPassword: passwordData.current,
            newPassword: passwordData.new,
          },
          { withCredentials: true }
        );
        toast.success("Password updated successfully");
        setPasswordData({ current: "", new: "", confirm: "" });
    } catch (error: any) {
        console.error(error);
        setErrors({ password: error.response?.data?.message || "Failed to update password." });
    } finally {
        setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1048576) {
      setErrors({ profilePic: "Image size must be less than 1 MB" });
      toast.error("Image size must be less than 1 MB");
      return;
    }

    setErrors((prev: any) => ({ ...prev, profilePic: undefined }));
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#59A5B2]" />
      </div>
    );
  }

  const getUserRoleLabel = () => {
    if (user?.roleid === 1) return "Admin";
    if (user?.roleid === 2) return "Owner";
    return "Customer";
  };

  return (
    <main className="flex-1 site-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f0f9fa] relative bg-gray-100 flex-shrink-0">
                {profilePic ? (
                  <img
                    src={profilePic || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
              {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#59A5B2] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Change profile picture"
              >
                <Camera className="w-5 h-5" />
              </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-500 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Verified Account
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                  {getUserRoleLabel()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${isEditing
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  : "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-lg shadow-[#59A5B2]/20"
                }`}
            >
              {isEditing ? (
                <>
                  <X className="w-5 h-5" /> Cancel
                </>
              ) : (
                <>
                  <Settings className="w-5 h-5" /> Edit Profile
                </>
              )}
            </button>
          </div>

          {errors.profilePic && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-200">
              {errors.profilePic}
            </div>
          )}
        </div>

        {/* --- Profile Information Form --- */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#59A5B2]" />
                Personal Information
                </h2>
                {isEditing && (
                    <button
                        onClick={handleProfileUpdate}
                        disabled={isSaving}
                        className="bg-[#59A5B2] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#4a8a95] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                )}
            </div>

            {errors.profile && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-200">
                {errors.profile}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "First Name", key: "firstName", type: "text" },
                { label: "Last Name", key: "lastName", type: "text" },
                { label: "Email Address", key: "email", type: "email" },
                { label: "Phone Number", key: "phone", type: "tel" },
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    disabled={!isEditing}
                    value={
                      profileData[
                      field.key as keyof typeof profileData
                      ] as string
                    }
                    onChange={(e) => setField(field.key, e.target.value)}
                    onBlur={(e) =>
                      isEditing && validateField(field.key, e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${errors[field.key as keyof typeof errors]
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-[#59A5B2]"
                      }`}
                  />
                  {errors[field.key as keyof typeof errors] && (
                    <p className="text-xs text-red-500">
                      {errors[field.key as keyof typeof errors]}
                    </p>
                  )}
                </div>
              ))}

              {isEditing && (
                <div className="md:col-span-2">
                  {/* <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <input
                        id="addr-ca"
                        type="radio"
                        name="addr-type"
                        checked={addressType === "canadian"}
                        onChange={() => {
                          setAddressType("canadian");
                          setField("country", {
                            value: "CA",
                            label: "Canada",
                          });
                          setField("state", "");
                          setField("canadian_provinceid", "");
                          setField("canadian_cityid", "");
                        }}
                        className="h-4 w-4 accent-[#59A5B2]"
                      />
                      <label
                        htmlFor="addr-ca"
                        className="text-sm font-medium text-gray-700"
                      >
                        Canadian Address
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="addr-intl"
                        type="radio"
                        name="addr-type"
                        checked={addressType === "international"}
                        onChange={() => {
                          setAddressType("international");
                          setField("canadian_provinceid", "");
                          setField("canadian_cityid", "");
                        }}
                        className="h-4 w-4 accent-[#59A5B2]"
                      />
                      <label
                        htmlFor="addr-intl"
                        className="text-sm font-medium text-gray-700"
                      >
                        International Address
                      </label>
                    </div>
                  </div> */}
                </div>
              )}

              {/* Conditional Rendering logic is preserved - only checking AddressType */}
              {/* If addressType is "canadian", we show Province/City Dropdowns */}
              {/* If "international", we show Country dropdown and text inputs */}
              
              {addressType === "canadian" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Canada"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Province
                    </label>
                    <Select
                      instanceId="profile-province"
                      isDisabled={!isEditing}
                      options={canadianProvinces.map((p) => ({
                        value: String(p.canadian_province_id),
                        label: p.canadian_province_name,
                      }))}
                      value={
                        (canadianProvinces || [])
                          .map((c) => ({
                            value: String(c.canadian_province_id),
                            label: c.canadian_province_name,
                          }))
                          .find(
                            (opt) =>
                              opt.value ===
                              String(profileData.canadian_provinceid)
                          ) || null
                      }
                      onChange={(opt: any) => {
                        setField(
                          "canadian_provinceid",
                          opt ? Number.parseInt(opt.value) : ""
                        );
                        setField("province", opt?.label || "");
                        setField("canadian_cityid", "");
                      }}
                      styles={selectStyles}
                      placeholder="Select province"
                    />
                    {errors.province && (
                      <p className="text-xs text-red-500">
                        {errors.province}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      City
                    </label>
                    <Select
                      instanceId="profile-city"
                      isDisabled={
                        !isEditing || !profileData.canadian_provinceid
                      }
                      options={(canadianCities || []).map((c) => ({
                        value: String(c.canadian_city_id),
                        label: c.canadian_city_name,
                      }))}
                      value={
                        (canadianCities || [])
                          .map((c: { canadian_city_id: any; canadian_city_name: any; }) => ({
                            value: String(c.canadian_city_id),
                            label: c.canadian_city_name,
                          }))
                          .find(
                            (opt: { value: string; }) =>
                              opt.value ===
                              String(profileData.canadian_cityid)
                          ) || null
                      }
                      onChange={(opt: any) => {
                        setField(
                          "canadian_cityid",
                          opt ? Number.parseInt(opt.value) : ""
                        );
                        setField("city", opt?.label || "");
                      }}
                      styles={selectStyles}
                      placeholder={
                        profileData.canadian_provinceid
                          ? "Select city"
                          : "Select province first"
                      }
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                </>
              )}

              {addressType === "international" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Country
                    </label>
                    <Select
                      instanceId="profile-country"
                      isDisabled={!isEditing}
                      options={countryOptions}
                      value={profileData.country}
                      onChange={(opt: any) => {
                        setField("country", opt);
                        setField("province", "");
                        setField("state", "");
                        setField("city", "");
                      }}
                      styles={selectStyles}
                      placeholder="Select country"
                    />
                    {errors.country && (
                      <p className="text-xs text-red-500">{errors.country}</p>
                    )}
                  </div>

                  {/* If country is manually selected as Canada in international list (edge case), handle appropriately or just general */}
                  {profileData.country?.value === "CA" ? (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Province
                      </label>
                      <input
                        disabled={!isEditing}
                        placeholder="Province"
                        value={profileData.province}
                        onChange={(e) => setField("province", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                      />
                      {errors.province && (
                        <p className="text-xs text-red-500">
                          {errors.province}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Province / State
                      </label>
                      <input
                        disabled={!isEditing}
                        placeholder="Province/State"
                        value={profileData.state}
                        onChange={(e) => setField("state", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                      />
                      {errors.state && (
                        <p className="text-xs text-red-500">{errors.state}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      City
                    </label>
                    <input
                      disabled={!isEditing}
                      placeholder="City"
                      value={profileData.city}
                      onChange={(e) => setField("city", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Address
                </label>
                <input
                  disabled={!isEditing}
                  placeholder="Street Address"
                  value={profileData.address}
                  onChange={(e) => setField("address", e.target.value)}
                  onBlur={(e) =>
                    isEditing && validateField("address", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 ${errors.address
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#59A5B2]"
                    }`}
                />
                {errors.address && (
                  <p className="text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  {addressType === "canadian"
                    ? "Postal Code"
                    : "Postal / ZIP"}
                </label>
                <input
                  disabled={!isEditing}
                  placeholder={
                    addressType === "canadian" ? "A1A 1A1" : "ZIP / Postal"
                  }
                  value={profileData.postalCode}
                  onChange={(e) => setField("postalCode", e.target.value)}
                  onBlur={(e) =>
                    isEditing && validateField("postalCode", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 ${errors.postalCode
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#59A5B2]"
                    }`}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* --- Security Settings Form (Separate Button) --- */}

          {
          profileData.isGoogleUser == false &&(
          isEditing && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#59A5B2]" />
                    Security Settings (Optional)
                  </h2>
                  <button
                        onClick={handlePasswordUpdate}
                        disabled={isSaving}
                        className="bg-[#59A5B2] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#4a8a95] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Update Password
                    </button>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                Leave these fields empty if you don't want to change your
                password
              </p>

              {errors.password && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-200">
                  {errors.password}
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.current}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          current: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.new}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          new: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirm}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirm: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#59A5B2] focus:ring-2 focus:ring-[#59A5B2]/20 outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        
        )}
        </div>
      </div>
    </main>
  );
} 