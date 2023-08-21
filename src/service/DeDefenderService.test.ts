import {expect, test} from 'vitest'
import DeDefenderService from "@/service/DeDefenderService";

const dedefenderService = new DeDefenderService()

const urlTests: string[][] = [
  ["https://github.com", ""],
  ["https://mcas-proxyweb.mcas.ms/certificate-checker?login=false&originalUrl=https%3A%2F%2Frandom.de.mcas.ms%2Fmy-group%2Fthis%2Fthat%2F-%2Fissues%2F209%3FMcasTsid%3D20893%23note_263593&McasCSRF=386181b47fa812ff565d42b4995abad89190a3319cd2c67dd8d653aa6241f191", "https://random.de/my-group/this/that/-/issues/209#note_263593"],
]

test.each(urlTests)('test DeDefended Links', (input: string, expected: string) => {
  // WHEN

  // THEN
  const output = dedefenderService.dedefendUrl(input)

  // VERIFY
  expect(output).toBe(expected)
})
