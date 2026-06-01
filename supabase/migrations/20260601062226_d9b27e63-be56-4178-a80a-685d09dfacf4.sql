CREATE TABLE public.grow_club_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  email TEXT NOT NULL,
  full_name TEXT,
  tier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.grow_club_signups TO anon;
GRANT SELECT, INSERT ON public.grow_club_signups TO authenticated;
GRANT ALL ON public.grow_club_signups TO service_role;

ALTER TABLE public.grow_club_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up"
ON public.grow_club_signups
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own signups"
ON public.grow_club_signups
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR auth.email() = email);

CREATE INDEX idx_grow_club_signups_email ON public.grow_club_signups(email);
