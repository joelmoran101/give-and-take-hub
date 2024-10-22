import React from 'react'

export default function Health() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Health Check</h1>
        <p className="text-gray-600">
          This is the health check page. If you can see this, the client-side routing is working correctly.
        </p>
        <div className="mt-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <svg className="mr-2 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            System Healthy
          </span>
        </div>
      </div>
    </div>
  )
}