import React from "react"
import { Link } from 'gatsby'

export default ({ pageContext: { persons } }) => (
    <div>
        <ul>
        {
            persons.map(person => (
                <li key={person.id}><Link to={`/person/${person.id}`} >{person.cells[3].displayValue}</Link></li>
            ))
        }
        </ul>
    </div>
)

