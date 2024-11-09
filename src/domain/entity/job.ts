export class Job {
  constructor(
    public readonly repo: string,
    public readonly description: string,
    public readonly labels: string,
    public readonly link: string,
    public readonly createdAt: string
  ) {}
}
