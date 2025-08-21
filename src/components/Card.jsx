import React from '@astrojs/react'
import './Card.css';

export default function Card() {
    return (
        <div class="box cursor-pointer">
            <span></span>
            <div class="content">
                <h2>Hover me!</h2>
            </div>
        </div>
  )
}

