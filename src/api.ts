const baseUrl = process.env.BASE_PATH;

interface QueryParam {
  queryParamName: string,
  queryParamValue: string
}

function createQueryParams(paramsMap: QueryParam[]) {
  const params = new URLSearchParams();
  paramsMap.forEach(param => {
    params.append(param.queryParamName, param.queryParamValue);
  })
  return params;
}

export function getBillingInfo(userId: string) {
  if (baseUrl) {
    const params = createQueryParams([
      {
        queryParamName: 'method',
        queryParamValue: 'LoadBillingInfo'
      },
      {
        queryParamName: 'id',
        queryParamValue: userId
      }
    ]);

    return fetch(new URL('/admin/Account/UserDetail.aspx?', baseUrl).toString() + params.toString)
  } else {
    return new Error('Are you sure you have set BASE_PATH ?')
  }
}
