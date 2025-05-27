import { motion } from 'framer-motion'

const ProgressBar = ({ 
  progress, 
  label, 
  color = 'bg-blue-500', 
  bgColor = 'bg-gray-200',
  textColor = 'text-gray-700',
  height = 'h-2',
  showPercentage = true 
}) => {
  return (
    <div className="w-full">
      {label && (
        <div className={`flex justify-between items-center mb-2 text-sm ${textColor}`}>
          <span>{label}</span>
          {showPercentage && <span>{progress}%</span>}
        </div>
      )}
      
      <div className={`w-full ${bgColor} rounded-full ${height} overflow-hidden`}>
        <motion.div
          className={`${height} ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar 