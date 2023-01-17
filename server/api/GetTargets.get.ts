import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const VENUES_PATH = "../../public/venues"

export default defineEventHandler((e) => {
  const query = getQuery(e)
  const venue = query.venue as string | undefined
  const venuePath = path.join(__dirname, VENUES_PATH, venue + '.json')

  const targets = {
    venue: '',
    targets: []
  }

  if (fs.existsSync(venuePath)) {
    const json = JSON.parse(fs.readFileSync(venuePath, 'utf-8'))
    targets.venue = json.venue
    targets.targets = json.targets
  }

  return targets
})