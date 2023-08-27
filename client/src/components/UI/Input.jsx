import { FC, forwardRef } from 'react'

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string,
//   name: string
//   placeholder: string,
//   onChange: any,
//   value: string
// }

const Input = forwardRef (({
  label, name, placeholder, onChange, value, type, style, min, max
}, ref) => {
  return (
    <div className="">
      <label htmlFor={name} className='text-white text-base sm:text-lg font-light px-1'>
        {label}
      </label>
      <input
        ref={ref}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        type={type || 'text'}
        className={'bg-transparent border border-white rounded-md px-4 py-2 w-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 text-white duration-300' }
        style={style} />
    </div>
  )

})

Input.displayName = 'Input';
export default Input