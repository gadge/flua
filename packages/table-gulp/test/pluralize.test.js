import { logger, xr } from '@spare/logger'
import pluralize from 'pluralize'

const candidates = [
  'apple',
  'pomelo',
  'potato',
  'cherry',
]

for (let candidate of candidates) {
  xr().candidate(candidate).value(pluralize(candidate)) |> logger
}
