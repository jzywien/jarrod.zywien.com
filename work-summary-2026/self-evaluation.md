# 2026 employee self-evaluation

**Jarrod Zywien — VP - Machine Learning Engineer, Moody’s**  
**Period: January 1–October 2, 2026**

## Overall contribution

My most significant accomplishment this year was helping launch Jenny to the Moody’s Ratings business at the end of September, making the platform available to an audience of more than 5,000 users. This was a team achievement. My contribution spanned the user experience, backend services, model integrations, access and spending controls, and the operational foundations supporting the launch.

During my first year at Moody’s, I have developed a broad understanding of how to deliver AI capabilities within our enterprise environment. My work this year reflects that breadth: building useful product features while addressing the authentication, data handling, deployment, and maintenance requirements that make them usable in practice.

## Product capabilities and user experience

I built substantial capabilities across Jenny’s API and web application. These included Deep Research with downloadable PDF reports and a reusable Agent library with a guided builder, configurable instructions, knowledge sources, skills, and tool access. I implemented editable drafts, immutable published versions, private testing and conversation history, named sharing, and version restoration. These controls let authors develop and test assistants while keeping existing conversations tied to their original configuration and preserving each user’s access boundaries.

I also expanded how Jenny connects to enterprise tools and knowledge. My work included an MCP registry, built-in server integration, OAuth handling, structured tool responses, and context exchange for embedded applications. I addressed connection failures such as unusable OAuth tokens and tool loading after authorization. For search, I implemented Vertex AI Search integration, bulk structured-document uploads, custom metadata, clearer upload failures, and authorized document downloads.

## Workflow reliability and platform operations

I developed a configuration-controlled Temporal backend for research and knowledge-table processing. This introduced retryable document stages, workflow execution, partial-result handling, and a unified worker while preserving existing client contracts and supporting a staged rollout. I also moved large extraction and content-understanding results from PostgreSQL rows to object storage, addressing payloads exceeding 35 MB while keeping API responses backward compatible.

Alongside feature delivery, I improved graceful shutdown, Kubernetes startup/readiness/liveness checks, worker credential refresh, workload identity federation, and model-gateway read-replica configuration. I maintained model and provider integrations and resolved compatibility and deployment issues as the available models evolved. This work strengthened the platform’s operational foundations as Jenny moved toward broader business availability.

## Access, spending controls, and engineering quality

I implemented automated monthly API-key budget assignment and reconciliation, aligned new budgets with month-to-date spending, and added budget handling for different employee groups. I built usage visibility and normalized model pricing with a comparison experience in the UI. Together, these capabilities provide mechanisms to manage access and spending and make model costs more understandable.

I also contributed to shared Python CI/CD support for uv-based projects and made lint and unit-test failures block builds. Across the application and platform repositories, I addressed dependency vulnerabilities, strengthened linting and type checking, and improved test and quality-check integration. My contribution included maintaining these controls as dependencies and infrastructure changed, alongside new feature development.

## Collaboration and scope

I contributed through both authored changes and review of colleagues’ work. The GitHub record for this period includes 325 authored pull requests across 11 repositories, of which 305 were merged. I also submitted reviews on 757 colleagues’ pull requests, including approval records on 730 distinct PRs. Related implementation, deployment, maintenance, and release changes are included in these totals; the accomplishments above group them into meaningful initiatives.

My review contributions included guidance on Angular form-control integration and API layering, checks on environment-specific configuration, and coordination around production secret prerequisites. I used both approvals and requests for changes to help colleagues move work forward with attention to correctness and deployment readiness.

The breadth of this work reflects my ability to connect product requirements with implementation and operations across the stack. I carried changes through coordinated API and UI work, migration and rollout considerations, and follow-up fixes, while contributing to the shared engineering work needed for the Jenny launch.

## Proposed priorities for the remainder of the year

- Use post-launch feedback and usage data to prioritize improvements and document the value Jenny delivers to Ratings users.
- Continue hardening long-running workflows, integrations, and operational monitoring as usage grows.
- Build on the existing access, budget, and pricing controls to support responsible expansion of AI capabilities.

## Short version

My biggest accomplishment in 2026 was helping launch Jenny to the Moody’s Ratings business at the end of September, making it available to more than 5,000 users. As a VP - Machine Learning Engineer, I contributed across the API, web application, model integrations, and platform operations. I built reusable Agent capabilities, research and PDF workflows, enterprise tool and search integrations, and API-key budget and pricing visibility. I also strengthened workflow processing, authentication, deployment health, and CI/CD. These contributions combined product delivery with the controls and operational foundations supporting a broad enterprise rollout.

---

Draft based on the employee-provided launch milestone and title, plus GitHub activity through October 2, 2026. The audience size describes launch availability, not measured active usage. The proposed priorities are suggestions. Supporting sources and rollout qualifications are in [evidence.md](evidence.md).
