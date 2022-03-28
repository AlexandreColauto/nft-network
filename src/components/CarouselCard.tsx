import React from 'react'
interface Props {
  name: string
  logo: string
  owner: string
}
function Card(props: Props) {
  return (
    <div>
      <div className="bg-secondary rounded-lg flex p-2">
        <div className="flex align-center">
          <img src={props.logo} className="rounded-full w-10 h-10 mr-2" />
          <div className="text-sm text-white">
            <p className="font-bold">{props.name}</p>
            <p> by {props.owner}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
