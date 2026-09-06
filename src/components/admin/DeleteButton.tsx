'use client';
export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="text-red-600 hover:underline" 
      onClick={(e) => {
        if(!confirm('Are you sure you want to delete this item?')) e.preventDefault();
      }}
    >
      Delete
    </button>
  );
}