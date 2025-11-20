This is Backend Runs in port **`3002`**
This Project runs under **`postgreSQL(DB)`**,**`postgREST(3000)`**,**`Nginx(FE-target-8081)`**

Project related dependencies:
**`postgREST(3000`)** - Version 14+
**`location`:**
cd C:\postgrest
postgrest.exe postgrest.conf
**`Nginx`**
**`location`**
**`Reset Nginx `**
cd C:\nginx
taskkill /F /IM nginx.exe

cd C:\nginx
nginx.exe -c conf/nginx.conf

---

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InBvc3RncmVzdCIsImlhdCI6MTc1OTY0Mjg1MCwiZXhwIjoxNzkxMTc4ODUwfQ.1lYOEcbPdY5ilQXw3j0UjshaDvBMkzQhS540EnLoYKc"
VITE_LOCAL_API_URL="http://localhost:8081/rest/v1"
VITE_ENV="development"
