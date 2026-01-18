import React from 'react';
import { MoodType } from './types';

// Enhanced contrast filter for all icons
const iconFilter = "drop-shadow(0 4px 6px rgba(45, 42, 38, 0.15))";
// Subtle defining stroke for light petals
const lightPetalStroke = { stroke: "#2d2a26", strokeWidth: "0.5", strokeOpacity: "0.1" };

export const MOOD_CONFIG = {
  [MoodType.HAPPY]: { label: 'Happy', flower: 'Sunflower', color: '#fde2b2', 
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img 
          src="/images/design-mode/R2D3eVgi_o.png" 
          alt="Sunflower" 
          className="w-full h-full object-contain"
          style={{ filter: iconFilter }}
        />
      </div>
    )
  },
  [MoodType.GRATEFUL]: { label: 'Grateful', flower: 'Pink Rose', color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img 
          src="/images/design-mode/6g4ukvQH_o.png" 
          alt="Pink Rose" 
          className="w-full h-full object-contain"
          style={{ filter: iconFilter }}
        />
      </div>
    )
  },
  [MoodType.PEACEFUL]: { label: 'Peaceful', flower: 'Lotus', color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img 
          src="/images/design-mode/kraz56RV_o.png" 
          alt="Lotus" 
          className="w-full h-full object-contain"
          style={{ filter: iconFilter }}
        />
      </div>
    )
  },
  [MoodType.JOYFUL]: { label: 'Joyful', flower: 'Yellow Daisy', color: '#fde2b2',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <circle cx="50" cy="50" r="10" fill="#fde2b2" {...lightPetalStroke} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
          <ellipse key={a} cx="50" cy="30" rx="6" ry="20" fill="#ffffff" {...lightPetalStroke} transform={`rotate(${a} 50 50)`} />
        ))}
      </svg>
    )
  },
  [MoodType.LOVED]: { label: 'Loved', flower: 'Red Rose', color: '#ffcad4',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        {/* Hand-drawn spiral rose for "Loved" with transparent background */}
        <path 
          d="M50 10 C65 10 85 20 88 42 C92 65 75 88 50 90 C25 90 8 75 12 50 C15 25 35 10 50 10 Z" 
          fill="#b01a22" 
        />
        <path 
          d="M50 50 C50 46, 54 46, 54 50 C54 56, 44 56, 44 48 C44 38, 60 38, 60 52 C60 68, 36 68, 36 46 C36 24, 72 24, 72 54 C72 82, 24 82, 24 44 C24 6, 82 6, 82 50" 
          fill="none" 
          stroke="#7b1218" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          opacity="0.9"
        />
      </svg>
    )
  },
  [MoodType.HOPEFUL]: { label: 'Hopeful', flower: 'Cherry Blossom', color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img 
          src="/images/design-mode/RyfYL2pv_o.png" 
          alt="Cherry Blossom" 
          className="w-full h-full object-contain"
          style={{ filter: iconFilter }}
        />
      </div>
    )
  },
  [MoodType.CALM]: { label: 'Calm', flower: 'Jasmine', color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img 
          src="/images/design-mode/zM8mmrmx_o.png" 
          alt="Jasmine" 
          className="w-full h-full object-contain"
          style={{ filter: iconFilter }}
        />
      </div>
    )
  },
  [MoodType.EXCITED]: { label: 'Excited', flower: 'Marigold', color: '#fde2b2',
    icon: (className: string) => (
      <div id="-marigold" className={`${className} flex items-center justify-center`}>
        <img 
          src="/images/design-mode/C34lBDDc_o.png" 
          alt="Marigold" 
          className="w-full h-full object-contain"
          style={{ filter: iconFilter }}
        />
      </div>
    )
  },
  [MoodType.CONTENT]: { label: 'Content', flower: 'White Gerbera Daisy', color: '#fefdfb',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        {[...Array(36)].map((_, i) => (
          <ellipse key={i} cx="50" cy="18" rx="2.5" ry="32" fill="#ffffff" {...lightPetalStroke} transform={`rotate(${i * 10} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="7" fill="#fde2b2" {...lightPetalStroke} />
        <circle cx="50" cy="50" r="3" fill="#4e6e58" opacity="0.1" />
      </svg>
    )
  },
  [MoodType.PROUD]: { label: 'Proud', flower: 'Yellow Rose', color: '#fde2b2',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <circle cx="50" cy="50" r="30" fill="#fff176" />
        <path d="M50 50 M50 20 C75 20 80 50 50 80 C20 50 25 20 50 20 Z" fill="#ffee58" opacity="0.4" />
        <path d="M50 35 Q65 35 65 50 Q65 65 50 65 Q35 65 35 50 Q35 35 50 35" fill="none" stroke="#d4c18f" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 42 Q58 42 58 50 Q58 58 50 58 Q42 58 42 50 Q42 42 50 42" fill="none" stroke="#d4c18f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  },
  [MoodType.ENERGIZED]: { label: 'Energized', flower: 'Orange Lily', color: '#fde2b2',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        {[0, 60, 120, 180, 240, 300].map(a => (
          <path key={a} d="M50 50 L40 10 Q50 -5 60 10 Z" fill="#ff7043" transform={`rotate(${a} 50 50)`} />
        ))}
        {[0, 60, 120, 180, 240, 300].map(a => (
          <path key={`v-${a}`} d="M50 50 L50 20" stroke="#bf360c" strokeWidth="1" strokeLinecap="round" opacity="0.4" transform={`rotate(${a} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="4" fill="#bf360c" />
      </svg>
    )
  },
  [MoodType.INSPIRED]: { label: 'Inspired', flower: 'Purple Tulip', color: '#dcd3ff',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <path d="M50 85 Q28 85 22 45 Q28 15 50 15 Q72 15 78 45 Q72 85 50 85" fill="#9c27b0" />
        <path d="M50 85 Q30 85 30 35 Q40 20 50 40" fill="#ba68c8" opacity="0.8" />
        <path d="M50 85 Q70 85 70 35 Q60 20 50 40" fill="#7b1fa2" opacity="0.3" />
      </svg>
    )
  },
  [MoodType.THOUGHTFUL]: { label: 'Thoughtful', flower: 'Purple Iris', color: '#dcd3ff',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        {[0, 120, 240].map(a => (
          <ellipse key={`up-${a}`} cx="50" cy="30" rx="8" ry="20" fill="#9575cd" transform={`rotate(${a} 50 50)`} />
        ))}
        {[60, 180, 300].map(a => (
          <ellipse key={`down-${a}`} cx="50" cy="40" rx="12" ry="25" fill="#7e57c2" transform={`rotate(${a} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="5" fill="#fde2b2" />
      </svg>
    )
  },
  [MoodType.QUIET]: { label: 'Quiet', flower: 'Baby\'s Breath', color: '#fefdfb',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <path d="M50 95 L50 65 L35 45 M50 65 L65 48 M35 45 L25 30 M35 45 L45 32 M65 48 L75 35 M65 48 L58 35" stroke="#4e6e58" strokeWidth="1.2" fill="none" />
        {[
          {x:25,y:30}, {x:45,y:32}, {x:75,y:35}, {x:58,y:35}, 
          {x:30,y:40}, {x:70,y:45}, {x:50,y:58}, {x:40,y:50}
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y})`}>
            <circle cx="0" cy="0" r="3" fill="white" {...lightPetalStroke} />
            <circle cx="2" cy="2" r="2.5" fill="white" {...lightPetalStroke} />
            <circle cx="-1" cy="3" r="2" fill="white" {...lightPetalStroke} />
          </g>
        ))}
      </svg>
    )
  },
  [MoodType.REFLECTIVE]: { label: 'Reflective', flower: 'White Chrysanthemum', color: '#fefdfb',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <path d="M50 95 L50 20" stroke="#4e6e58" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {[
          {y: 22, x: 50, s: 1}, 
          {y: 42, x: 42, s: 0.8}, {y: 42, x: 58, s: 0.8},
          {y: 62, x: 38, s: 0.7}, {y: 62, x: 62, s: 0.7}
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y}) scale(${p.s})`}>
            <path d={`M${50-p.x} ${62-p.y} L0 0`} stroke="#4e6e58" strokeWidth="1" fill="none" opacity="0.4" />
            {[0, 72, 144, 216, 288].map(a => (
              <ellipse key={a} cx="0" cy="-8" rx="2.5" ry="10" fill="white" transform={`rotate(${a})`} {...lightPetalStroke} />
            ))}
            <circle cx="0" cy="0" r="2" fill="#fde2b2" />
          </g>
        ))}
      </svg>
    )
  },
  [MoodType.ANXIOUS]: { label: 'Anxious', flower: 'Lavender Stalk', color: '#dcd3ff',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        {[35, 50, 65].map((x, i) => (
          <g key={x} transform={`translate(${x}, 0) rotate(${i === 0 ? -5 : i === 2 ? 5 : 0} 0 95)`}>
            <rect x="-0.4" y="40" width="0.8" height="55" fill="#4e6e58" />
            {[0, 7, 14, 21, 28].map(y => (
              <g key={y} transform={`translate(0, ${18+y})`}>
                <ellipse cx="-3.5" cy="0" rx="3" ry="5.5" fill="#9575cd" transform="rotate(-15)" />
                <ellipse cx="3.5" cy="0" rx="3" ry="5.5" fill="#7e57c2" transform="rotate(15)" />
              </g>
            ))}
            <ellipse cx="0" cy="12" rx="3.5" ry="6" fill="#b39ddb" />
          </g>
        ))}
      </svg>
    )
  },
  [MoodType.SAD]: { label: 'Sad', flower: 'Blue Hydrangea', color: '#d1e8e2',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <circle cx="50" cy="50" r="34" fill="#90caf9" opacity="0.3" />
        {[
          {x:50,y:50}, {x:35,y:42}, {x:65,y:42}, {x:35,y:58}, {x:65,y:58},
          {x:50,y:30}, {x:50,y:70}, {x:25,y:50}, {x:75,y:50}
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y}) scale(0.65)`}>
            {[0, 90, 180, 270].map(a => (
              <path key={a} d="M0 0 Q8 -10 16 0 Q8 10 0 0" fill="#64b5f6" transform={`rotate(${a})`} />
            ))}
            <circle cx="0" cy="0" r="2.5" fill="#ffffff" opacity="0.6" />
          </g>
        ))}
      </svg>
    )
  },
  [MoodType.TIRED]: { label: 'Tired', flower: 'Red Mushroom', color: '#e57373',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <path d="M12 62 Q50 5 88 62 Z" fill="#e57373" />
        <rect x="42" y="62" width="16" height="32" rx="8" fill="#fefdfb" />
        <circle cx="32" cy="45" r="5" fill="white" opacity="0.9" />
        <circle cx="50" cy="30" r="7" fill="white" opacity="0.9" />
        <circle cx="68" cy="48" r="4" fill="white" opacity="0.9" />
      </svg>
    )
  },
  [MoodType.LONELY]: { label: 'Lonely', flower: 'Single White Rose', color: '#fefdfb',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <path d="M50 95 L50 45" stroke="#4e6e58" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 75 Q65 72 70 60 Q55 58 50 68" fill="#4e6e58" />
        <g transform="translate(50, 35)">
          <circle cx="0" cy="0" r="28" fill="white" {...lightPetalStroke} />
          <path d="M0 -22 C18 -22 22 0 0 22 C-18 0 -14 -22 0 -22" fill="#f5f5f5" opacity="0.6" />
          <path d="M0 -12 C10 -12 12 0 0 12 C-10 0 -8 -12 0 -12" fill="#eeeeee" opacity="0.8" />
          <circle cx="0" cy="0" r="4" fill="#d4c18f" opacity="0.3" />
        </g>
      </svg>
    )
  },
  [MoodType.OVERWHELMED]: { label: 'Overwhelmed', flower: 'Cluster of Field Daisies', color: '#fefdfb',
    icon: (className: string) => (
      <svg viewBox="0 0 100 100" className={className} style={{ filter: iconFilter }}>
        <path d="M50 95 L50 60 M50 75 L30 45 M50 80 L70 50" stroke="#4e6e58" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {[
          {x:50,y:40,s:0.95}, {x:30,y:45,s:0.75}, {x:70,y:50,s:0.85},
          {x:42,y:22,s:0.65}, {x:62,y:28,s:0.7}
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y}) scale(${p.s})`}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
              <ellipse key={a} cx="0" cy="-12" rx="3.5" ry="11" fill="white" transform={`rotate(${a})`} {...lightPetalStroke} />
            ))}
            <circle cx="0" cy="0" r="5" fill="#fde2b2" />
          </g>
        ))}
      </svg>
    )
  }
};
