export default function SelectClusterMethod ({label, value, state,  onSelectMethod}) {
    return (
      <>
          <label className="label">{label}</label>
          <div>
            <select 
              placeholder='Cluster method'
              value={value}
              autoComplete='off'
              onChange={onSelectMethod}
            >
              <option value=''> -- Choose Cluster Method -- </option>
              <option value='kmeans'> K-means </option>
              <option value='hierarchial'> Hierarchical </option>
            </select>
          </div>
      </>
    )
}
