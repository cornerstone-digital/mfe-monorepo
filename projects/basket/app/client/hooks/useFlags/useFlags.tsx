import { useEffect } from 'react'
import axios from 'axios'

import { useStore } from '@store'
import { FeatureFlagConfig } from '@shared/types/global'

const useFlags = async () => {
  const { basketStore } = useStore()

  const fetchFlags = async () => {
    try {
      const flagData = await axios.get('/basket/flags')
      const flags: FeatureFlagConfig = flagData.data

      basketStore.setFlagData(flags)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchFlags()
  }, [])
}

export default useFlags
