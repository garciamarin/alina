import { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from '@next/env'

loadEnvConfig('.')

const config: CodegenConfig = {
    schema: {
        'https://graphql.datocms.com': {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`
            }
        }
    },
    documents: './**/*.graphql',
    generates: {
        '.graphql/datoTypes.ts': {
            plugins: [
                { typescript: {} },
                {
                    'typescript-operations': {
                        preset: 'client',
                        strictScalars: true,
                        scalars: {
                            BooleanType: 'boolean',
                            CustomData: 'Record<string, unknown>',
                            Date: 'string',
                            DateTime: 'string',
                            FloatType: 'number',
                            IntType: 'number',
                            ItemId: 'string',
                            JsonField: 'unknown',
                            MetaTagAttributes: 'Record<string, string>',
                            UploadId: 'string'
                        }
                    }
                },
                { 'typed-document-node': {} }
            ]
        }
    }
}

export default config
