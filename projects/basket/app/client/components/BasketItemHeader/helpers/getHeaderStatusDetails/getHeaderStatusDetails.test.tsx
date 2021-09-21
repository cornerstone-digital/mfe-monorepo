import getHeaderStatusDetails from './getHeaderStatusDetails'

describe('getHeaderStatusDetails', () => {
  const headerTitle = 'test title'
  const headerSubTitle = 'test subtitle'
  it.each`
    headerStatus    | isPackage | expectedTitle                   | expectedHeaderAction | iconSize
    ${'present'}    | ${true}   | ${headerTitle}                  | ${'Remove'}          | ${2}
    ${'present'}    | ${false}  | ${headerTitle}                  | ${'Remove'}          | ${1}
    ${'removing'}   | ${true}   | ${`Removing ${headerTitle}`}    | ${''}                | ${'sm'}
    ${'removing'}   | ${false}  | ${`Removing ${headerTitle}`}    | ${''}                | ${'xs'}
    ${'removed'}    | ${true}   | ${`You removed ${headerTitle}`} | ${'Undo'}            | ${2}
    ${'removed'}    | ${false}  | ${`You removed ${headerTitle}`} | ${'Undo'}            | ${1}
    ${'retrieving'} | ${true}   | ${`Retrieving ${headerTitle}`}  | ${''}                | ${'sm'}
    ${'retrieving'} | ${false}  | ${`Retrieving ${headerTitle}`}  | ${''}                | ${'xs'}
  `('should return with proper result', ({ headerStatus, isPackage, expectedTitle, expectedHeaderAction, iconSize }) => {
    const result = getHeaderStatusDetails(headerTitle, headerSubTitle, headerStatus, isPackage)
    expect(result?.headerAction).toBe(expectedHeaderAction)
    expect(result?.headerTitle).toBe(expectedTitle)
    expect(result?.headerSubTitle).toBe(headerSubTitle)
    expect(result?.headerIcon.props.size).toBe(iconSize)
  })
})
