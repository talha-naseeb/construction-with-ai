# Validation and error rules

- Validate forms in the browser for immediate feedback and again in the backend once it exists.
- Never trust route guards or hidden controls as authorization; the backend enforces every permission.
- Show plain-language error messages and preserve entered form values after validation failures.
- Use non-blocking toast messages for successful actions and recoverable errors.
- Sensitive customer actions require a verification state from the backend before completion.
