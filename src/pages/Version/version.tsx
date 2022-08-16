import { Grid, Typography } from '@material-ui/core'
import { useResolution } from 'hooks/useResolution'
import packageJson from '../../../package.json'

const Version = () => {
  const { h1 } = useResolution()
  return (
    <>
      <Grid>
        <Typography variant={h1}>{packageJson.version}</Typography>
      </Grid>
    </>
  )
}
export default Version
