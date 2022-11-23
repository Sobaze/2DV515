

export default function SelectSimilarity ({label, value, state,  onSelectSim}) {
    return (
      <>
        <div>
          <label className="label">{label}</label>
          <div>
            <select 
              placeholder='Similarity'
              value={value}
              autoComplete='off'
              onChange={onSelectSim}
            >
              <option value=''> --Choose Similarity </option>
              <option value='euclidean'> Euclidean </option>
              <option value='pearson'> Pearson </option>
            </select>
          </div>
        </div>
      </>
    )
}