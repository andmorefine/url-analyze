import { headers } from 'next/headers'

interface DynamicObject {
  [key: string]: string | number
}

interface QueryParam {
  name: string
  value: string | number
}

const createQueryParams = (obj: DynamicObject): QueryParam[] => {
  return Object.keys(obj).map((key) => ({
    name: key,
    value: obj[key],
  }))
}

const Home = async ({ searchParams }: { searchParams: DynamicObject }) => {
  const headersList = headers()
  const currentUrl = headersList.get('x-url') || ''

  const queryParams = createQueryParams(searchParams)

  return (
    <main>
      <h1 className="text-lg font-semibold m-2">URL Analyzer</h1>
      <p className="px-4 py-2">URLの長さ: {currentUrl.length} 文字</p>

      <h2 className="text-lg font-semibold m-2">GETパラメータ</h2>
      <p className="px-4 py-2 mb-2">パラメータ数: {queryParams.length} 個</p>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              index
            </th>
            <th className="px-2 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              パラメータ名
            </th>
            <th className="px-2 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              値
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {queryParams.map(({ name, value }, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-2 py-2 border-b border-gray-200 text-sm text-gray-900">
                {index + 1}
              </td>
              <td className="px-2 py-2 border-b border-gray-200 text-sm text-gray-900">
                {name}
              </td>
              <td className="px-2 py-2 border-b border-gray-200 text-sm text-gray-900">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Home
