
const Dhome = () => {
    return (

        <div className="space-y-8">
        {/* Grille de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {statsConfig.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                stat.onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
              }`}
              onClick={stat.onClick}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-800/30`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
  
        {/* Graphiques supplémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Répartition des types d'actes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-bold dark:text-white mb-4">Types d'actes</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats?.types_acte && Object.entries(stats.types_acte).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">{type}</span>
                  <span className="font-bold dark:text-white">{count}</span>
                </div>
              ))}
            </div>
          </motion.div>
  
          {/* Répartition géographique */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-bold dark:text-white mb-4">Clients par commune</h3>
            <div className="space-y-3">
              {stats?.clients_par_commune?.map((commune, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-700 dark:text-gray-300">{commune.commune}</span>
                  <span className="font-bold dark:text-white">{commune.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
}

export default Dhome