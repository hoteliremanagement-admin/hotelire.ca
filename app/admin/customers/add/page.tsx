// "use client"

// import * as React from "react"
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowLeft } from "lucide-react"

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

// export default function AddCustomerPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
//     phoneNumber: "", address: "", provinceId: "", cityId: "", postalCode: ""
//   })
//   const [provinces, setProvinces] = useState([])
//   const [cities, setCities] = useState([])
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     fetch(`${baseUrl}/auth/getCanadianProvinces`).then(res => res.json()).then(data => setProvinces(data.provinces || []))
//   }, [])

//   useEffect(() => {
//     if (formData.provinceId) {
//       fetch(`${baseUrl}/auth/getCanadianCities/${formData.provinceId}`).then(res => res.json()).then(data => setCities(data.cities || []))
//     }
//   }, [formData.provinceId])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (formData.password !== formData.confirmPassword) return setError("Passwords do not match")
//     setIsSubmitting(true)
//     setError("")
//     try {
//       const response = await fetch(`${baseUrl}/admin/customers`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstname: formData.firstName,
//           lastname: formData.lastName,
//           email: formData.email,
//           passwordhash: formData.password,
//           phoneno: formData.phoneNumber,
//           address: formData.address,
//           postalcode: formData.postalCode,
//           canadian_provinceid: formData.provinceId,
//           canadian_cityid: formData.cityId
//         })
//       })
//       if (response.ok) router.push("/admin/customers")
//       else {
//         const data = await response.json()
//         setError(data.message || "Failed to create customer")
//       }
//     } catch (err) { setError("An error occurred") }
//     finally { setIsSubmitting(false) }
//   }

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <div className="flex items-center gap-4 mb-8">
//         <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="h-4 w-4" /></Button>
//         <h1 className="text-3xl font-bold">Add New Customer</h1>
//       </div>

//       <Card>
//         <CardHeader><CardTitle>Customer Information</CardTitle></CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2"><Label>First Name</Label><Input value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required /></div>
//               <div className="space-y-2"><Label>Last Name</Label><Input value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required /></div>
//             </div>
//             <div className="space-y-2"><Label>Email</Label><Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required /></div>
//             <div className="space-y-2"><Label>Phone Number</Label><Input value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} required /></div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2"><Label>Password</Label><Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required /></div>
//               <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required /></div>
//             </div>
//             <div className="space-y-2"><Label>Street Address</Label><Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required /></div>
//             <div className="grid grid-cols-3 gap-4">
//               <div className="space-y-2"><Label>Province</Label>
//                 <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.provinceId} onChange={e => setFormData({...formData, provinceId: e.target.value, cityId: ""})} required>
//                   <option value="">Select Province</option>
//                   {provinces.map((p: any) => <option key={p.canadian_province_id} value={p.canadian_province_id}>{p.canadian_province_name}</option>)}
//                 </select>
//               </div>
//               <div className="space-y-2"><Label>City</Label>
//                 <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.cityId} onChange={e => setFormData({...formData, cityId: e.target.value})} required>
//                   <option value="">Select City</option>
//                   {cities.map((c: any) => <option key={c.canadian_city_id} value={c.canadian_city_id}>{c.canadian_city_name}</option>)}
//                 </select>
//               </div>
//               <div className="space-y-2"><Label>Postal Code</Label><Input value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} required /></div>
//             </div>
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             <Button type="submit" className="w-full bg-primary text-white" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Customer"}</Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Select from "react-select"
import axios from "axios"
import { ArrowLeft } from "lucide-react"

const BRAND = "#59A5B2"

type CustomerErrors = Partial<{
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  address: string
  province: string
  city: string
  postalCode: string
}>

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
const canadianPostalRegex = /^[A-Z]\d[A-Z][ ]?\d[A-Z]\d$/
const canadianAddressRegex = /^\d+\s+[A-Za-z0-9\s,'-]+$/
const nameRegex = /^[A-Za-z ]{1,20}$/

const sanitizePhone = (s: string) => s.replace(/\D/g, "").slice(0, 10)
const nameSanitize = (s: string) =>
  s
    .replace(/[^A-Za-z ]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 20)

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 48,
    borderColor: state.isFocused ? BRAND : "#e5e7eb",
    boxShadow: state.isFocused ? `0 0 0 1px ${BRAND}` : "none",
    "&:hover": { borderColor: BRAND },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? BRAND : state.isFocused ? "#f3f4f6" : "white",
    color: state.isSelected ? "white" : "#111827",
  }),
}

interface CanadianProvince {
  canadian_province_id: number
  canadian_province_name: string
}

interface CanadianCity {
  canadian_city_id: number
  canadian_city_name: string
  canadian_province_id: number
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function AddCustomerPage() {
  const router = useRouter()
  const [canadianProvinces, setCanadianProvinces] = useState<CanadianProvince[]>([])
  const [canadianCities, setCanadianCities] = useState<CanadianCity[]>([])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    province: "",
    city: "",
    postalCode: "",
    canadian_provinceid: "",
    canadian_cityid: "",
  })

  const [errors, setErrors] = useState<CustomerErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/getCanadianProvinces`)
        const data = await response.json()
        setCanadianProvinces(data.provinces || [])
      } catch (error) {
        console.error("Error fetching provinces:", error)
      }
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    if (formData.canadian_provinceid) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`${baseUrl}/auth/getCanadianCities/${formData.canadian_provinceid}`)
          const data = await response.json()
          setCanadianCities(data.cities || [])
        } catch (error) {
          console.error("Error fetching cities:", error)
        }
      }
      fetchCities()
    }
  }, [formData.canadian_provinceid])

  const setField = (field: keyof typeof formData, value: any) => {
    if ((field === "firstName" || field === "lastName") && typeof value === "string") {
      value = nameSanitize(value)
    }
    if (field === "phoneNumber" && typeof value === "string") {
      value = sanitizePhone(value)
    }
    if (field === "postalCode" && typeof value === "string") {
      value = value.toUpperCase()
    }

    if (field === "province") {
      setFormData((prev) => ({
        ...prev,
        province: value,
        city: "",
        canadian_cityid: "",
      }))
      validateField("province", value)
      setErrors((e) => ({ ...e, city: "" }))
      return
    }

    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field !== "confirmPassword") validateField(field, value)
  }

  const validateField = (field: keyof typeof formData, raw: any) => {
    const value = typeof raw === "string" ? raw.trim() : raw
    let msg = ""

    switch (field) {
      case "firstName":
      case "lastName":
        if (!value) msg = "This field is required."
        else if (!nameRegex.test(value)) msg = "Letters and spaces only."
        break
      case "email":
        if (!value) msg = "Email is required."
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) msg = "Invalid email address."
        break
      case "password":
        if (!value) msg = "Password is required."
        else if (!passwordRegex.test(value)) msg = "Min 8 chars, 1 uppercase, 1 number."
        break
      case "confirmPassword":
        if (!value) msg = "Confirm your password."
        else if (value !== formData.password.trim()) msg = "Passwords do not match."
        break
      case "address":
        if (!value) msg = "Address is required."
        else if (!canadianAddressRegex.test(value)) msg = "Use Canadian format (e.g., 123 Queen Street W)."
        break
      case "province":
        if (!formData.canadian_provinceid) msg = "This field is required."
        break
      case "city":
        if (!formData.canadian_cityid) msg = "This field is required."
        break
      case "postalCode": {
        const v = value.toUpperCase()
        if (!v) msg = "Postal code is required."
        else if (!canadianPostalRegex.test(v)) msg = "Format: A1A 1A1"
        break
      }
      case "phoneNumber": {
        const v = value.toString()
        if (!v) msg = "Phone number is required."
        else if (!/^\d+$/.test(v)) msg = "Digits only."
        else if (v.length !== 10) msg = "Must be 10 digits."
        break
      }
    }

    setErrors((prev) => ({ ...prev, [field]: msg }))
    return msg === ""
  }

  const validateAll = () => {
    const requiredFields: (keyof typeof formData)[] = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "phoneNumber",
      "province",
      "city",
      "address",
      "postalCode",
    ]
    return requiredFields.every((f) => validateField(f, formData[f]))
  }

  const inputClass = (invalid?: string) =>
    [
      "h-12",
      "border-gray-300",
      "focus:border-[#59A5B2]",
      "focus:ring-[#59A5B2]",
      invalid && "border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500",
    ]
      .filter(Boolean)
      .join(" ")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        passwordhash: formData.password,
        phoneno: formData.phoneNumber,
        address: formData.address,
        postalcode: formData.postalCode,
        canadian_provinceid: formData.canadian_provinceid,
        canadian_cityid: formData.canadian_cityid,
      }

      const response = await axios.post(`${baseUrl}/admin/customers`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })

      if (response.data) {
        router.push("/admin/customers")
      }
    } catch (error: any) {
      setSubmitError(error.response?.data?.message || "Failed to create customer. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-display font-bold text-foreground">Add New Customer</h1>
        </div>

        {/* Form Card */}
        <Card className="w-full max-w-7xl shadow-sm">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Full Name</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setField("firstName", e.target.value)}
                      onBlur={(e) => validateField("firstName", e.target.value)}
                      className={inputClass(errors.firstName)}
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setField("lastName", e.target.value)}
                      onBlur={(e) => validateField("lastName", e.target.value)}
                      className={inputClass(errors.lastName)}
                    />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  placeholder="customer@example.com"
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={(e) => validateField("email", e.target.value)}
                  className={inputClass(errors.email)}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Canadian Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="5551234567"
                  value={formData.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  onBlur={(e) => validateField("phoneNumber", e.target.value)}
                  className={inputClass(errors.phoneNumber)}
                />
                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Password</Label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setField("password", e.target.value)}
                    onBlur={(e) => validateField("password", e.target.value)}
                    className={inputClass(errors.password)}
                  />
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Confirm Password</Label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setField("confirmPassword", e.target.value)}
                    onBlur={(e) => validateField("confirmPassword", e.target.value)}
                    className={inputClass(errors.confirmPassword)}
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Street Address</Label>
                <Input
                  placeholder="123 Queen St"
                  value={formData.address}
                  onChange={(e) => setField("address", e.target.value)}
                  onBlur={(e) => validateField("address", e.target.value)}
                  className={inputClass(errors.address)}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>

              {/* Location Selects */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Province</Label>
                  <Select
                    options={canadianProvinces.map((p) => ({ value: p.canadian_province_id, label: p.canadian_province_name }))}
                    styles={selectStyles}
                    onChange={(opt: any) => {
                      setField("canadian_provinceid", opt.value)
                      setField("province", opt.label)
                    }}
                    placeholder="Select..."
                  />
                  {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">City</Label>
                  <Select
                    options={canadianCities.map((c) => ({ value: c.canadian_city_id, label: c.canadian_city_name }))}
                    styles={selectStyles}
                    onChange={(opt: any) => {
                      setField("canadian_cityid", opt.value)
                      setField("city", opt.label)
                    }}
                    isDisabled={!formData.canadian_provinceid}
                    placeholder="Select..."
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Postal Code</Label>
                  <Input
                    placeholder="A1A 1A1"
                    value={formData.postalCode}
                    onChange={(e) => setField("postalCode", e.target.value)}
                    onBlur={(e) => validateField("postalCode", e.target.value)}
                    className={inputClass(errors.postalCode)}
                  />
                  {errors.postalCode && <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              {submitError && <p className="text-sm text-red-500">{submitError}</p>}

              <Button type="submit" className="w-full h-12 text-white bg-[#59A5B2] hover:bg-[#59A5B2]/90" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Customer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
