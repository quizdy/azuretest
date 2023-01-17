import fs from "fs";
import path from "path"
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const VENUES_PATH = "../../public/venues"

export default defineEventHandler(() => {
  const venuesDir = path.join(__dirname, VENUES_PATH)
  if (!fs.existsSync(venuesDir)) {
    fs.mkdirSync(venuesDir, { recursive: true })
    return {
      venues: []
    }
  }
  const venues = fs.readdirSync(venuesDir).map((json) => path.basename(json, '.json'))
  return {
    venues: venues
  }
})