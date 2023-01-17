import fs from 'fs';
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const VENUES_PATH = "../../public/venues"

export default defineEventHandler(async(e) => {
  console.log('UpdateVenue')
  const body = await readBody(e)
  const venue = body.venue as string | undefined

  const venuesPath = path.join(__dirname, VENUES_PATH)
  if (!fs.existsSync(venuesPath)) fs.mkdirSync(venuesPath, {recursive: true})

  const venuePath = path.join(venuesPath, venue + '.json')

  const targets = {
    venue: venue,
    targets: []
  }

  if (fs.existsSync(venuePath)) {
    targets.venue = venue
    targets.targets = JSON.parse(fs.readFileSync(venuePath, 'utf-8')).targets
  }

  try {
    fs.writeFileSync(venuePath, JSON.stringify(targets, null, 2))
  } catch (e) {
    return {
      ret: false,
      msg: JSON.stringify(e)
    }
  }

  return {
    ret: true,
    msg: 'success'
  }
})