// SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  User, FileText, Lock, Mail,
  ArrowLeft, ArrowRight, Eye, EyeOff, Upload, Check
} from 'lucide-react';
const API_URL = 'http://localhost:5000';
const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Skills & Resume', icon: FileText },
  { id: 3, label: 'Security', icon: Lock }
];

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    course: '',
    semester: '',
    college: '',
    skills: '',
    resume: null,
    password: '',
    confirmPassword: ''
  });

  const [err, setErr] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const courses = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics & Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'BCA',
    'MCA',
    'B.Sc IT',
    'M.Sc IT',
    'Other'
  ];
  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErr(e => ({ ...e, [name]: '' }));
    setSuccessMessage(''); // Clear success message on form change
  };

  // COMMENTED OUT: PDF validation for resume
  // const onFile = e => {
  //   const f = e.target.files[0];
  //   if (f?.type === 'application/pdf' && f.size <= 5e6) {
  //     setForm(fm => ({ ...fm, resume: f }));
  //     setErr(er => ({ ...er, resume: '' }));
  //     setSuccessMessage(''); // Clear success message on file change
  //   } else {
  //     setErr(er => ({ ...er, resume: 'Upload PDF ≤5MB' }));
  //   }
  // };

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = 'Required';
      if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
      if (!form.course) e.course = 'Required';
      if (!form.semester) e.semester = 'Required';
      if (!form.college.trim()) e.college = 'Required';
    }
    if (step === 2) {
      if (!form.skills.trim()) e.skills = 'Enter skills';
      // COMMENTED OUT: Resume validation
      // if (!form.resume) e.resume = 'Upload PDF';
    }
    if (step === 3) {
      if (form.password.length < 8) e.password = 'Min 8 chars';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    setErr(e);
    return !Object.keys(e).length;
  };

  const next = () => validate() && setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const onSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErr({});
    setSuccessMessage('');

    try {
      // Create FormData for file upload
      const response = await axios.post(`${API_URL}/api/v1/user/register`, form)
      toast.success("Registration succesfful");
      setSuccessMessage('Account created successfully! You can now login.');

      // Reset form after 2 seconds
      setTimeout(() => {
        setForm({
          name: '',
          email: '',
          course: '',
          semester: '',
          college: '',
          skills: '',
          resume: null,
          password: '',
          confirmPassword: ''
        });
        setStep(1);
        navigate('/login');
        
      }, 1000);


    } catch (error) {
      console.error('Registration error:', error.message);
      setSuccessMessage('');
      setErr({ general: 'Network error. Please check your connection and try again.' });
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg">
        <div className="bg-indigo-600 text-white py-6 text-center rounded-t-xl">
          <div className="text-2xl font-bold">Join TeamUP</div>
          <div className="text-sm opacity-80">Create your profile</div>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          {steps.map(s => {
            const active = s.id === step;
            const done = s.id < step;
            return (
              <div key={s.id} className="flex-1 text-center">
                <div
                  className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${done
                      ? 'bg-green-500 text-white'
                      : active
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                >
                  {done ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <s.icon
                  className={`mx-auto mb-1 w-5 h-5 ${active ? 'text-indigo-500' : 'text-gray-400'
                    }`}
                />
                <div className={`text-xs ${active ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="p-6">
          {/* Display general error message */}
          {err.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {err.general}
            </div>
          )}

          {/* Display success message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {step === 1 && (
            <>
              {/* Full Name Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.name ? 'border-red-400' : 'border-gray-300'
                      }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {err.name && <p className="text-xs text-red-600 mt-1">{err.name}</p>}
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.email ? 'border-red-400' : 'border-gray-300'
                      }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {err.email && <p className="text-xs text-red-600 mt-1">{err.email}</p>}
              </div>

              {/* Course Select */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Course</label>
                <select
                  name="course"
                  value={form.course}
                  onChange={onChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.course ? 'border-red-400' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select Course</option>
                  {courses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {err.course && <p className="text-xs text-red-600 mt-1">{err.course}</p>}
              </div>

              <div className="flex gap-4 mb-4">
                {/* Semester Select */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">Semester</label>
                  <select
                    name="semester"
                    value={form.semester}
                    onChange={onChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.semester ? 'border-red-400' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {err.semester && <p className="text-xs text-red-600 mt-1">{err.semester}</p>}
                </div>

                {/* College Input */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">College</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      name="college"
                      type="text"
                      value={form.college}
                      onChange={onChange}
                      className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.college ? 'border-red-400' : 'border-gray-300'
                        }`}
                      placeholder="College name"
                    />
                  </div>
                  {err.college && <p className="text-xs text-red-600 mt-1">{err.college}</p>}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Skills Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Skills (comma-separated)</label>
                <input
                  name="skills"
                  value={form.skills}
                  onChange={onChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.skills ? 'border-red-400' : 'border-gray-300'
                    }`}
                  placeholder="React, Node.js, CSS, Python"
                />
                {err.skills && <p className="text-xs text-red-600 mt-1">{err.skills}</p>}
              </div>

              {/* COMMENTED OUT: Resume Upload */}
              {/*
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Resume (PDF ≤5MB)</label>
                <label className={`flex items-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  err.resume ? 'border-red-400' : 'border-gray-300'
                }`}>
                  <Upload className="w-6 h-6 text-gray-400 mr-2" />
                  <span className={form.resume ? 'text-gray-900' : 'text-gray-600'}>
                    {form.resume ? form.resume.name : 'Click to upload your resume'}
                  </span>
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    className="hidden" 
                    onChange={onFile} 
                  />
                </label>
                {err.resume && <p className="text-xs text-red-600 mt-1">{err.resume}</p>}
              </div>
              */}
            </>
          )}

          {step === 3 && (
            <>
              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={onChange}
                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.password ? 'border-red-400' : 'border-gray-300'
                      }`}
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPwd(v => !v)}
                  >
                    {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {err.password && <p className="text-xs text-red-600 mt-1">{err.password}</p>}
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConf ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={onChange}
                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${err.confirmPassword ? 'border-red-400' : 'border-gray-300'
                      }`}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConf(v => !v)}
                  >
                    {showConf ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {err.confirmPassword && <p className="text-xs text-red-600 mt-1">{err.confirmPassword}</p>}
              </div>
            </>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={prev}
              disabled={step === 1}
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating…' : 'Create Account'} <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
