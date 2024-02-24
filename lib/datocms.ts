import { request as graphqlRequest, RequestDocument, Variables } from "graphql-request"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"

export function getDato<TDocument = any>(
    document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
    variables?: Variables,
    includeDrafts?: boolean
) {
    return graphqlRequest<TDocument, Variables>("https://graphql.datocms.com/", document, variables, {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
        ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    })
}