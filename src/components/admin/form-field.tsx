import { Label } from '@/components/ui/label';

// Shared form field component with validation for admin forms
export function FormField({ 
  id, 
  label, 
  error, 
  required = false, 
  children 
}: { 
  id: string; 
  label: string; 
  error?: string | undefined; 
  required?: boolean; 
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className={error ? 'text-red-600' : ''}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}