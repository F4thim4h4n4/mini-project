-- Database Schema for NexHostel (Supabase / PostgreSQL)
-- This script is optimized for the Supabase SQL Editor.

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop tables if they exist to allow clean re-run (Comment out if you want to keep data)
-- DROP TABLE IF EXISTS public.payments CASCADE;
-- DROP TABLE IF EXISTS public.complaints CASCADE;
-- DROP TABLE IF EXISTS public.students CASCADE;
-- DROP TABLE IF EXISTS public.rooms CASCADE;
-- DROP TABLE IF EXISTS public.users CASCADE;

-- 1. Users table (Custom table for user profiles)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT, -- Safe to store encrypted passwords if not using Supabase Auth
    role TEXT CHECK (role IN ('student', 'admin')) DEFAULT 'student',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_number TEXT UNIQUE NOT NULL,
    capacity INT NOT NULL,
    current_occupancy INT DEFAULT 0,
    type TEXT CHECK (type IN ('Single', 'Double', 'Triple')) NOT NULL,
    price_per_month NUMERIC(10,2) NOT NULL,
    status TEXT CHECK (status IN ('Available', 'Full')) DEFAULT 'Available'
);

-- 3. Students table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    roll_no TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Complaints table
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    status TEXT CHECK (status IN ('Pending', 'In Progress', 'Resolved')) DEFAULT 'Pending',
    assigned_staff TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    status TEXT CHECK (status IN ('Paid', 'Unpaid')) DEFAULT 'Unpaid',
    due_date DATE,
    paid_date TIMESTAMPTZ,
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
-- Note: By default, RLS is active but allows no one. 
-- For testing, you can disable it, but for production, you should add policies.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Simple Policies (Allow public access for testing - Change this for production!)
CREATE POLICY "Allow public select" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON public.users FOR SELECT USING (true);

-- Initial Mock Data
INSERT INTO public.rooms (room_number, capacity, type, price_per_month) 
VALUES 
('101', 1, 'Single', 5000),
('102', 2, 'Double', 3500),
('201', 3, 'Triple', 2500)
ON CONFLICT (room_number) DO NOTHING;
