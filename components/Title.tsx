import React from 'react'

export default function Title({title, className}: {title: string, className?: string}) {
  return (
    <h1 className={`font-fredoka text-4xl font-medium leading-12 mb-8 ${className}`}>
        {title}
    </h1>
  )
}
