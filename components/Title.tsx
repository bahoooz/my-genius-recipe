import React from 'react'

export default function Title({title}: {title: string}) {
  return (
    <h1 className="font-fredoka text-4xl font-medium leading-12 mb-8">
        {title}
    </h1>
  )
}
