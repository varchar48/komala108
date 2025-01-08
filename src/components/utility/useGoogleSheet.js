import useGoogleSheets from 'use-google-sheets';

const APIKey = "AIzaSyD7_vDWpGYiSRBVai_2_Aa1QPmSdqIjrzQ";

const useGoogleSheetData = (sheetId, sheetNames) => {
  const sheetsOptions = Array.isArray(sheetNames)
    ? sheetNames.map(name => ({ id: name }))
    : [{ id: sheetNames }];

  const { data, loading, error } = useGoogleSheets({
    apiKey: APIKey,
    sheetId: sheetId,
    sheetsOptions: sheetsOptions,
  });

  return { data, loading, error };
};

export default useGoogleSheetData;