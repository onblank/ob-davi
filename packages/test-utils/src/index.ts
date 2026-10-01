export class FakeClock {
  constructor(private current: Date = new Date('2026-01-01T00:00:00Z')) {}
  now(): Date {
    return new Date(this.current);
  }
  set(value: Date): void {
    this.current = new Date(value);
  }
}
