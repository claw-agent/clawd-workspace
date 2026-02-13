'use client';

import { useState } from 'react';

export default function NotesField() {
  const [notes, setNotes] = useState('');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 print-hide no-print">
      <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-3">
        Estimate Notes
      </p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes about this estimate (roof condition, customer requests, access issues...)"
        rows={3}
        className="w-full text-sm border border-gray-200 rounded-md p-3 outline-none
                   focus:ring-2 focus:ring-orange/50 focus:border-orange resize-y
                   placeholder:text-gray-400"
      />
    </div>
  );
}
