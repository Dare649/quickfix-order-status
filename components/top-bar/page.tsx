import Image from 'next/image';

const TopBar = () => {
  return (
    <div className='w-full bg-primary-2 lg:p-5 sm:p-2'>
        <Image
            src='/logo.svg'
            alt='QuickFix'
            width={200} 
            height={200}
        />
    </div>
  )
}

export default TopBar